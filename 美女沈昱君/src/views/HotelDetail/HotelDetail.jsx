import React from 'react'
import { useState,useEffect,useRef} from 'react'
import { useSearchParams } from 'react-router-dom'
import { Image,DatePicker } from 'antd';
import { DownCircleOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
import "./HotelDetail.scss";
import { $hotelInfo,$inventory} from "../../api/userApi";
import moment from "moment"


export default function HotelDetail() {
    const [params] = useSearchParams()
    const [name,setName]=useState('')
    const [isRecommend,setIsRecommend]=useState(true) //表示是否推荐，那个大拇指的小图标
    const [adress,setAdress]=useState('')
    const [hotelDetail,setHotelDetail]=useState({})
    const [imgs,setImgs]=useState([['hotel1_0',require('../../asstes/hotelImg/hotel1.jpg')],
        ['hotel1_1',require('../../asstes/hotelImg/hotel2.jpg')],
        ['hotel1_2',require('../../asstes/hotelImg/hotel3.jpg')],
        ['hotel1_3',require('../../asstes/hotelImg/hotel4.jpg')]])
    const [imgsRight,setImgsRight]=useState([
        ])
    const [inOutTime,setInOutTime]=useState(['14:00','12:00']) //退房时间
    const [room,setRoom]=useState([])
    const [visible, setVisible] = useState(false);
    const [inOutDate,setInOutDate]=useState(['','']) //保存居住日期
    const [liveDays,setLiveDays]=useState(0)  //保存住的天数，用于后面计算应付钱数
    let roomNav=useRef(null)
    let policyItem=useRef(null)   
    const [showmore,setShowMore]=useState(false)
    const [navItem,SetNavItem]=useState('room')
    const [payPageShow,setPayPageShow]=useState(false)
    const [orderInfo,setOrderInfo]=useState({
                                            EachPrice:null,
                                            inOutDay:['',''],
                                            roomName:''
                                            })
    
    useEffect(() => {
        // console.log(params.get('id'))
        let hotelId=params.get('id')
        async function getHotelRoom(){
            const requestData =await $hotelInfo(hotelId)
            let data=requestData.meta.data
            setName(data.hotelName)
            setIsRecommend(data.isRecommend)
            setAdress(data.address)
            setHotelDetail(data.HotelDetail)
            setImgs(data.imgs)
            setImgsRight(data.imgsRight)
            setInOutTime(data.inOutTime)
            setRoom(data.room)
        }
        getHotelRoom()
    },[])     

    function toRoom(){//功能，滚动到导航栏那边
        roomNav.current.scrollIntoView({behavior:'smooth',block:'start'}); 
    }

    const onChange = (value, dateString) => { //计算入住天数差
        // console.log('Formatted Selected Time: ', dateString) //['2023-04-24', '2023-04-25']
        setInOutDate(dateString)
        console.log(dateString)
        let days=moment(dateString[1]).diff(moment(dateString[0]),'days') //计算天数差
        setLiveDays(days)
    };

    function showMore(){   //更多标签
        setShowMore(!showmore)
    }
    function toPolicy(){  //政策和房间两个tab切换
        policyItem.current.scrollIntoView({behavior:'smooth',block:'start'});
        SetNavItem('policy')
    }
    function toRoomList(){ //点击房间，滚动到房间
        roomNav.current.scrollIntoView({behavior:'smooth',block:'start'});
        SetNavItem('room')   
    }
    function closePayPage(){ //关闭支付页面
        setPayPageShow(false) //关闭订单界面 （注意在这边准备一下，如果是没有支付直接取消的话，这个订单变成未完成订单）
    }
    function payInfo(price,roomtype,inventory){ //点击预定按钮，传递订单信息，并弹出支付界面
        console.log('1',inventory)
        if(inventory<=0){
            alert('已售罄，请选择别的房型')
        }else if(liveDays==0){
            alert('请先选择入住日期')
        }else{
            setPayPageShow(true) //订单页面显示
            const newOrder={
                EachPrice:price,
                inOutDay:inOutDate,
                roomName:roomtype
            }
            setOrderInfo(newOrder) //更新订单信息
        }
    }
    function submitOrder(){
        // 需提交请求1，把房间库存-1 
        // 需提交请求2，给这个账户增加一个成功的订单  ---和小沈联动
        alert('支付成功')
        setPayPageShow(false)
        let hotelId=params.get('id')//酒店id
        // 1.发送请求1，减少库存
        async function inventoryUpdate(){
            const requestData =await $inventory(hotelId,orderInfo.roomName)
            let data=requestData.meta.data
            setName(data.hotelName)
            setIsRecommend(data.isRecommend)
            setAdress(data.address)
            setHotelDetail(data.HotelDetail)
            setImgs(data.imgs)
            setImgsRight(data.imgsRight)
            setInOutTime(data.inOutTime)
            setRoom(data.room)
        }
        inventoryUpdate()
        // 2.给订单那边发送请求，给这个人新增一个成功的订单

    }
    function cancelOrder(){
        // 需提交请求3，给这个账户增加一个待支付的订单  ---和小沈联动
        setPayPageShow(false)
        console.log('订单未完成，在待支付订单里')
    }

    return (
    <div>
        <section className='hotelDetailHead'>
            <div className='detaiHeadline'>
                <div className='detaiHeadlineLeft'>
                    <div className='detailHeadlineTitle'>
                        {name}
                        {isRecommend&&<img className="recommendImg" src={require('../../asstes/recommend.jpg')}  alt="糟糕！图片加载不出来啦" />}
                    </div>
                    <div className='detailHeadlineAddress'>
                        <img className="iconImg" src={require('../../asstes/iconfont/location.png')}  alt="糟糕！图片加载不出来啦" />
                        {adress}
                    </div>
                    <div className='detailHeadlineUtility'>
                        <img className="iconImg" src={require('../../asstes/iconfont/building.png')}  alt="糟糕！图片加载不出来啦" />
                        <span>开业：{hotelDetail.beginTime}</span>
                        <span>{hotelDetail.detail}</span>
                    </div>
                </div>
                <div className='detaiHeadlineright'><div onClick={toRoom} className='btn'>选择房间</div></div> 
            </div>
            <div className='detaiHeadContext'>
                <div className='detaiHeadImg'>
                    <div className='imgLeft'>
                        <Image
                            className='imgCover'
                            preview={{ visible: false }}
                            src={imgs[0][1]}
                            onClick={() => setVisible(true)}
                        />
                        <div style={{ display: 'none' }}>
                            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                            {
                                imgs.map((item,index)=>{
                                    return <Image src={imgs[index][1]} key={imgs[index][0]}/>
                                })
                            }
                            </Image.PreviewGroup>
                        </div>
                    </div>
                    <div className='imgRight'>
                        {
                            imgsRight.map((item,index)=>{
                                return  <div className='imgRightItem' key={imgsRight[index][0]}>
                                            <Image
                                                className='imgCover'
                                                preview={{ visible: false }}
                                                src={imgsRight[index][1]}
                                                onClick={() => setVisible(true)}
                                            />
                                        </div>
                            })
                        }
                    </div>
                </div>
                <div className='detaiHeadcomment'></div>
            </div>
        </section>

        <section className='hotelDetailRoom'>
            <div className='hotelDetailNav' ref={roomNav}>
                <div className={['room', navItem=='room'?'active':null].join(' ')} onClick={toRoomList}>房间</div>
                <div className={['policy', navItem=='policy'?'active':null].join(' ')} onClick={toPolicy}>政策</div>
            </div>
            <div className='hotelRoomList'>
                <div className='search'>
                    <RangePicker className='datepick' format="YYYY-MM-DD" onChange={onChange} placeholder={['开始日期','结束日期']}/>
                    <span>{liveDays}晚</span>
                </div>
                <div className='filter'>
                    <div className='filterItem active'>立即确认</div>
                    <div className='filterItem'>大床房</div>
                    <div className='filterItem'>双床房</div>
                    <div className='filterItem'>免费取消</div>
                    <div className='filterItem'>可订</div>
                </div>
                <div className='roomType'>
                    {
                        room.map((item,index)=>{
                            return  <div className={['roomItem',item.inventory==0?'deactive':null].join(' ')} key={index}>
                                        <div className='roomItemLeft'>
                                            <div className='roomPic'>
                                                <img className="roomImg" src={item.img}  alt="糟糕！图片加载不出来啦" />
                                            </div>
                                            <div className='roomName'>{item.name}</div>
                                            <div className='roomUtility'>
                                                <span>{item.describe[0].size}</span>
                                                <span className='roomUtilityDivide'>|</span>
                                                <span>{item.describe[1].area}<sup>2</sup></span>
                                                <span className='roomUtilityDivide'>|</span>
                                                <span>{item.describe[2].window}</span>
                                            </div>
                                            <div className='roomInventory'>剩余{item.inventory}间</div>
                                        </div>
                                        <div className='roomItemRight'>
                                            <div className='priceSelect'>
                                                <div className='peopleNumber'>
                                                    <img className="iconImg" src={require('../../asstes/iconfont/person.png')}  alt="糟糕！图片加载不出来啦" />
                                                    <img className="iconImg" src={require('../../asstes/iconfont/person.png')}  alt="糟糕！图片加载不出来啦" />
                                                </div>
                                                <div className='breakfast'><span>无早餐</span></div>
                                                <div className='policy'>
                                                    {item.priceType[0].isCancel && <div className='policyItem'>限时取消</div>}
                                                    {item.priceType[0].instantConfirm && <div className='policyItem'>立即确认</div>}
                                                </div>
                                                <div className='rest'></div>
                                                <div className='priceOrder'>
                                                    <div className='price'>￥{item.priceType[0].breakfast0}</div>
                                                    <div className='priceBtn'>
                                                        <div className='btn' onClick={()=>{payInfo(item.priceType[0].breakfast0,item.name,item.inventory)}}>预订</div>
                                                        <div className='onlinePay'>在线付</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='priceSelect'>
                                            <div className='peopleNumber'>
                                                    <img className="iconImg" src={require('../../asstes/iconfont/person.png')}  alt="糟糕！图片加载不出来啦" />
                                                    <img className="iconImg" src={require('../../asstes/iconfont/person.png')}  alt="糟糕！图片加载不出来啦" />
                                                </div>
                                                <div className='breakfast'><span>1份早餐</span></div>
                                                <div className='policy'>
                                                    {item.priceType[1].isCancel && <div className='policyItem'>限时取消</div>}
                                                    {item.priceType[1].instantConfirm && <div className='policyItem'>立即确认</div>}
                                                </div>
                                                <div className='rest'></div>
                                                <div className='priceOrder'>
                                                    <div className='price'>￥{item.priceType[1].breakfast1}</div>
                                                    <div className='priceBtn'>
                                                        <div className='btn' onClick={()=>{payInfo(item.priceType[1].breakfast1,item.name,item.inventory)}}>预订</div>
                                                        <div className='onlinePay'>在线付</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='priceSelect'>
                                            <div className='peopleNumber'>
                                                    <img className="iconImg" src={require('../../asstes/iconfont/person.png')}  alt="糟糕！图片加载不出来啦" />
                                                    <img className="iconImg" src={require('../../asstes/iconfont/person.png')}  alt="糟糕！图片加载不出来啦" />
                                                </div>
                                                <div className='breakfast'><span>2份早餐</span></div>
                                                <div className='policy'>
                                                    {item.priceType[2].isCancel && <div className='policyItem'>限时取消</div>}
                                                    {item.priceType[2].instantConfirm && <div className='policyItem'>立即确认</div>}
                                                </div>
                                                <div className='rest'></div>
                                                <div className='priceOrder'>
                                                    <div className='price'>￥{item.priceType[2].breakfast2}</div>
                                                    <div className='priceBtn'>
                                                        <div className='btn' onClick={()=>{payInfo(item.priceType[2].breakfast2,item.name,item.inventory)}}>预订</div>
                                                        <div className='onlinePay'>在线付</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* {item.priceType.breakfast0} */}
                                            
                                        </div>
                                        
                                    </div>
                        })
                    }
                </div>

            </div>
            <div className='hotelPolicy' ref={policyItem}>
                <div className='policyTitle'>酒店政策</div>
                <div className='policyMain'>
                    <div className='policyItem'>
                        <div className='hpLeft'>订房必读</div>
                        <div className='hpRight'>
                            <li>城市通知</li>
                            <div className='titDesc'>
                            <p>为贯彻落实《上海市生活垃圾管理条例》相关规定，推进生活垃圾源头减量，上海市文化和旅游局特制定《关于本市旅游住宿业不主动提供客房一次性日用品的实施意见》，2019年7月1日起，上海市旅游住宿业将不再主动提供牙刷、梳子、浴擦、剃须刀、指甲锉、鞋擦这些一次性日用品。若需要可咨询酒店。</p>
                            </div>
                        </div>
                    </div>
                    <div className='policyItem'>
                        <div className='hpLeft'>入离时间</div>
                        <div className='hpRight'>
                            <div className='hpInOut'>
                                <div className='hpIn'>入住时间：{inOutTime[0]}后</div>
                                <div className='hpOut'>退房时间：{inOutTime[1]}前</div>
                            </div>
                        </div>
                    </div>
                    <div className='policyItem'>
                        <div className='hpLeft'>儿童及加床</div>
                        <div className='hpRight'>
                            <div>欢迎携带17岁及以下儿童入住</div>
                            <div style={{fontWeight:'bold',padding:'8px 0px'}}>婴儿床及加床政策</div>
                            <div>加床及婴儿床政策请详询酒店</div>
                        </div>
                    </div>
                    {showmore&&
                        <div>
                            <div className='policyItem hidden' >
                                <div className='hpLeft'>年龄限制</div>
                                <div className='hpRight'>不允许18岁以下单独办理入住</div>
                            </div>
                            <div className='policyItem hidden'>
                                <div className='hpLeft'>宠物</div>
                                <div className='hpRight'>不可携带宠物</div>
                            </div>
                            <div className='policyItem hidden'>
                                <div className='hpLeft'>押金</div>
                                <div className='hpRight'>押金收取方式: 固定收取100.00RMB</div>
                            </div>
                            <div className='policyItem hidden'>
                                <div className='hpLeft'>预定提示</div>
                                <div className='hpRight'>订单需等酒店或供应商确认后生效，订单确认结果以携程短信、邮件或app通知为准。</div>
                            </div>
                        </div>
                    }

                </div>
                <div className='policyShowmore' onClick={showMore}>
                    <div>
                        <span style={{fontSize: '14px', color: '#287dfa',marginRight:'5px'}}>展开</span><DownCircleOutlined style={{ fontSize: '14px', color: '#287dfa',height:'34px'}}/>
                    </div>
                </div>
            </div>

        </section>

        {payPageShow&&
            <section className='hotelPay'>
                <div className='payPageMain'>
                    <div className='closePay' onClick={closePayPage}>X</div>
                    <div className='payTitle'>
                        <div className='payItem'><span className='payItemLeft'>房间信息: </span> <span className='payItemRight'>{orderInfo.roomName}</span></div>
                        <div className='payItem'>
                            <span className='payItemLeft'>入住日期: </span>
                            <span className='inDate'>{orderInfo.inOutDay[0]}</span>  
                            <span className='inDate'>{orderInfo.inOutDay[1]}</span> 
                            <span className='liveLength'>{liveDays}晚</span>
                        </div>
                        <div className='payItem'>发票信息：联系前台</div>
                        <div className='payItem'>待支付：<span className='priceToPay'>￥{liveDays*orderInfo.EachPrice}</span></div>
                        <div className='okCancel'>
                            <div className='payBtn ok' onClick={submitOrder}>确  认</div>
                            <div className='payBtn cancel' onClick={cancelOrder}>取  消</div>
                        </div>
                    </div>
                </div>
                
            
            </section>
        }
    </div>
  )
}
