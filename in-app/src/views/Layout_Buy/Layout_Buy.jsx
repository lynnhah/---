import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate  } from "react-router-dom";
import {  Spin,Input, Space } from 'antd';
const { Search } = Input;
import "./Layout_Buy.scss";
import "../../mock/hotelInfo.js"
import { $hotel} from "../../api/userApi";
export default function Layout_Buy() {  //函数式组件没有生命周期，用hook模拟
    let navigate = useNavigate();
    const [hotelInfo,setHotelInfo]=useState([])
    const [showHotelInfo,setShowHotelInfo]=useState([])
    const [hotHotel,setHotHotel]=useState([])
    let [loadingComplete,setLoadingComplete]=useState(false)
    const [selectHotel,setSelectHotel]=useState('all') //选择按钮的切换
    const [keywords,setKeywords]=useState('请输入关键词') //便于输入关键词点击后，恢复

    useEffect(() => {
        async function fetchData(){
            const requestData =await $hotel()
            const hotel=requestData.meta.data.data.data.fileList
            setHotelInfo(requestData.meta.data.data.data.fileList)  
            setShowHotelInfo(requestData.meta.data.data.data.fileList)
            // 筛选热门酒店-评分大于>4.4
            const hot=[]
            for(let i=0;i<hotel.length;i++){
                if(hotel[i].score>=4.4){
                    hot.push(hotel[i])
                }
            }
            setHotHotel(hot)   
        }
        fetchData()
        setLoadingComplete(true)
    },[])

    //函数功能：携带酒店id跳转
    function toHotelDetail(item){ 
        navigate(`/layout-user/buy/hoteldetail?id=${item.id}`,{ replace: true })
    }

    //函数功能：根据property属性的数值进行排序
    function bubbleSort(arr,property){ //冒泡拍序
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<arr.length-1-i;j++){
                if(arr[j][property]>arr[j+1][property]){
                    let tmp=arr[j+1]
                    arr[j+1]=arr[j]
                    arr[j]=tmp
                }
            }
        }
    }

    function showHotel(select){
        setSelectHotel(select) //active样式的切换
        switch (select){
            case 'all':
                setShowHotelInfo(hotelInfo)
                break
            case 'price':
                let arr=showHotelInfo //冒泡排序
                bubbleSort(arr,'price')
                setShowHotelInfo(arr)
                break
            case 'distance':
                let arr1=showHotelInfo //冒泡排序
                bubbleSort(arr1,'distance')
                setShowHotelInfo(arr1)
                break
        }
    }

    const onSearch = (value) =>{
        let arr=[]
         // 拿到关键词对所有酒店的名字、地点进行搜索
        for(let i=0;i<hotelInfo.length;i++){
            if(hotelInfo[i].hotelName.includes(value) || hotelInfo[i].location.includes(value)){
                arr.push(hotelInfo[i])
            }
        }
        setShowHotelInfo(arr)
       
        //在展示列表时增加一个如果showHotelInfo这个数组长度==0，就出现一个div,显示暂未搜索到任何结果
    } 

    return (
    <div className='hotelBuy'>
        {!loadingComplete&&
            <div className='loading'>
                <div className='content'><Spin size="large" /></div>
                
            </div>
        }
        {loadingComplete&&
            <div className='mainContent' >
                <div className='hotelAll'>
                    <div className='filter'>
                        <div className={['filterItem',selectHotel=='all'?'active':null].join(' ')} onClick={()=>{showHotel('all')}}>全部</div>
                        <div className={['filterItem',selectHotel=='price'?'active':null].join(' ')} onClick={()=>{showHotel('price')}}>价格排序</div>
                        <div className={['filterItem',selectHotel=='distance'?'active':null].join(' ')} onClick={()=>{showHotel('distance')}}>距离远近</div>
                        <div className='searchItem'>
                            <Search placeholder={keywords} onSearch={onSearch} />
                            </div>
                    </div>
                {  
                    showHotelInfo.map((item,index)=>{
                        return <div className='hotelItem' key={item.id}>
                                <div className='left'>
                                    <img 
                                        loading='lazy'
                                        className={"hotelImg"} 
                                        src={item.imgUrl} 
                                        alt="糟糕！图片加载不出来啦"
                                    />
                                    <div className='hotelInfo'>
                                        <div className='hotelName'><span>{item.hotelName}</span></div>
                                        <div className='hotelLocation'><span>{item.location} | 距市中心直线{item.distance}公里</span></div>
                                        <div className='hotelService'>
                                            <span>{item.utility}</span>
                                            
                        
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='right'>
                                    <div className='commentScore'>
                                        <div className='comment'><a href="#!">{item.comment.length}条点评</a></div>
                                        <div className='score'>{item.score}</div>
                                    </div>
                                    <div className='hotelPriceWrapper'>
                                        <div className='price'>￥{item.price}</div>
                                        <div className='detail'><a onClick={()=>{toHotelDetail(item)}}>查看详情</a></div>
                                    </div>
                                </div>
                        </div>
                    }
                    )
                }
                {showHotelInfo.length==0&&<div className='noContent'>暂未搜索到任何结果</div>}
                </div>
                <div className='hotelRec'>
                    <div className='hotelHotelTab'>
                        <div className='hotTab'>热门酒店</div>
                    </div>
                    <div className='hotHotelWrapper'>
                    {   hotHotel.map((item,index)=>{
                            return  <div className='hotHotelItem' key={index} onClick={()=>toHotelDetail(item)}>
                                        <img 
                                            loading='lazy'
                                            className={"hotHotelImg"} 
                                            src={item.imgUrl} 
                                            alt="糟糕！图片加载不出来啦"
                                        />
                                        <div className='hotHotelName'>{item.hotelName}</div>
                                        <div className='hotHotelDescription'>
                                            <div className='hotHotelScore'>{item.score}<span>/5</span></div>
                                            <div className='hotHotelComment'><a>{item.comment.length}点评</a></div>
                                        </div>
                                        <div className='hotHotelPrice'>￥{item.price}</div>
                                    </div>
                        
                        })
                    }
                    </div>
                </div>
            </div>
        }
    </div>
    )
}

