import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate  } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import "./Layout_Buy.scss";
import "../../mock/hotelInfo.js"
import { $hotel} from "../../api/userApi";
export default function Layout_Buy() {  //函数式组件没有生命周期，用hook模拟
    let navigate = useNavigate();
    // let history = useHistory();
    const [hotelInfo,setHotelInfo]=useState([])
    const [hotHotel,setHotHotel]=useState([])
    useEffect(() => {
        async function fetchData(){
            const requestData =await $hotel()
            const hotel=requestData.meta.data.data.data.fileList
            setHotelInfo(requestData.meta.data.data.data.fileList)  
            // 筛选热门酒店-评分大于>4.5
            const hot=[]
            for(let i=0;i<hotel.length;i++){
                if(hotel[i].score>=4.4){
                    hot.push(hotel[i])
                }
            }
            setHotHotel(hot)
        }
        fetchData()
    },[])

    function toHotelDetail(item){ //携带酒店id跳转
        navigate(`/layout/buy/hoteldetail?id=${item.id}`,{ replace: true })
    }

    return (
    <div className='hotelBuy'>
        <div className='hotelAll'>
        {  
            hotelInfo.map((item,index)=>{
                return <div className='hotelItem' key={item.id}>
                        <div className='left'>
                            <img 
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
        </div>
        <div className='hotelRec'>
            <div className='hotelHotelTab'>
                <div className='hotTab'>热门酒店</div>
            </div>
            <div className='hotHotelWrapper'>
            {   hotHotel.map((item,index)=>{
                    return  <div className='hotHotelItem' key={index}>
                                <img 
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
    )
}

