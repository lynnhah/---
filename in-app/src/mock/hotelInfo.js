// 此页为模拟酒店信息
const Mock = require('mockjs') //导入mockjs
import { baseURL } from "../config/index";

var fileList=[{
  id:'001',
  hotelName:'西奥酒店',
  location:'迪士尼',
  utility:['行李寄存',' 咖啡厅',' Spa',' 免费停车',' 接机服务',' 健身室',' 免费早餐'],
  comment:['','','','','','','','','','','','','',''],
  score:4.7,
  price:466,
  imgUrl:require('../asstes/hotelImg/hotel1.jpg'),
  distance:26,
  isRecommend:true,
  address:'中国，上海，浦东区，南仓街118号',
  HotelDetail:{
    beginTime:2021,
    detail:'酒店位于南浦大桥地铁站周边，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel1.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room1.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['14:00','12:00'],
  room:[{
      name:'流金奢华大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'28m'},{window:'有窗'}],
      priceType:[{breakfast0:658,isCancel:true,instantConfirm:true},{breakfast1:678,isCancel:true,instantConfirm:true},{breakfast2:698,isCancel:true,instantConfirm:true}],
      inventory:3,
      label:['大床房','立即取消','免费取消']
  },
  {   
      
      name:'流金精选双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'阳光豪华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:7,
      label:['套房','立即取消','免费取消']
  }]
},
{
  id:'002',
  hotelName:'鹿安花园酒店',
  location:'徐汇区',
  utility:['行李寄存',' 闪住',' 免费停车',' 接机服务'],
  comment:['','','','',''],
  score:4.5,
  price:354,
  imgUrl:require('../asstes/hotelImg/hotel2.jpg'),
  distance:43,
  isRecommend:true,
  address:'中国，上海，徐汇区，北苍街118号',
  HotelDetail:{
    beginTime:2022,
    detail:'酒店位于徐汇区，近华东理工大学地铁站，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel2.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room5.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['13:00','13:00'],
  room:[{
      name:'商务大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'18m'},{window:'有窗'}],
      priceType:[{breakfast0:658,isCancel:true,instantConfirm:true},{breakfast1:678,isCancel:true,instantConfirm:true},{breakfast2:698,isCancel:true,instantConfirm:true}],
      inventory:3,
      label:['大床房','立即取消','免费取消']
  },
  {   
      
      name:'豪华双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'奢华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:7,
      label:['套房','立即取消','免费取消']
  }]
},
{
  id:'003',
  hotelName:'AIEL酒店',
  location:'海洋公园',
  utility:['行李寄存',' 咖啡厅',' Spa',' 免费停车',' 接机服务',' 健身室',' 免费早餐'],
  comment:['','','','','','','','','','','','','',''],
  score:4.5,
  price:588,
  imgUrl:require('../asstes/hotelImg/hotel9.jpg'),
  distance:26,
  isRecommend:true,
  address:'中国，上海，浦东区，海思路999号',
  HotelDetail:{
    beginTime:2019,
    detail:'酒店位于南浦大桥地铁站周边，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel9.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room1.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['14:00','12:00'],
  room:[{
      name:'月若流金豪华大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'18m'},{window:'有窗'}],
      priceType:[{breakfast0:658,isCancel:true,instantConfirm:true},{breakfast1:678,isCancel:true,instantConfirm:true},{breakfast2:698,isCancel:true,instantConfirm:true}],
      inventory:3,
      label:['大床房','立即取消','免费取消']
  },
  {   
      
      name:'月若流金精选双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'加州阳光豪华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:2,
      label:['套房','立即取消','免费取消']
  }]  
},
{
  id:'004',
  hotelName:'云睿酒店',
  location:'浦东机场核心区',
  utility:['行李寄存','健身房',' 闪住',' 免费停车',' 接机服务'],
  comment:['','','','',''],
  score:4.6,
  price:658,
  imgUrl:require('../asstes/hotelImg/hotel4.jpg'),
  distance:3,
  isRecommend:true,
  address:'中国，上海，浦东区，南仓街118号',
  HotelDetail:{
    beginTime:2021,
    detail:'酒店位于南浦大桥地铁站周边，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel4.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room1.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['14:00','12:00'],
  room:[{
      name:'月若流金豪华大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'18m'},{window:'有窗'}],
      priceType:[{breakfast0:658,isCancel:true,instantConfirm:true},{breakfast1:678,isCancel:true,instantConfirm:true},{breakfast2:698,isCancel:true,instantConfirm:true}],
      inventory:3,
      label:['大床房','立即取消','免费取消']
  },
  {   
      
      name:'月若流金精选双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'加州阳光豪华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:7,
      label:['套房','立即取消','免费取消']
  }]
},
{
id:'005',
hotelName:'如安民宿',
location:'迪士尼',
utility:['行李寄存',' 闪住',' 免费停车',' 接机服务','健身房'],
comment:['','','','',''],
score:4.5,
price:454,
imgUrl:require('../asstes/hotelImg/hotel5.jpg'),
distance:6,
isRecommend:true,
  address:'中国，上海，浦东区，南仓街118号',
  HotelDetail:{
    beginTime:2021,
    detail:'酒店位于南浦大桥地铁站周边，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel5.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room1.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['14:00','12:00'],
  room:[{
      name:'标准大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'18m'},{window:'有窗'}],
      priceType:[{breakfast0:658,isCancel:true,instantConfirm:true},{breakfast1:678,isCancel:true,instantConfirm:true},{breakfast2:698,isCancel:true,instantConfirm:true}],
      inventory:3,
      label:['大床房','立即取消','免费取消']
  },
  {   
      
      name:'精选精致双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'海底豪华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:7,
      label:['套房','立即取消','免费取消']
  }]
},
{
id:'006',
hotelName:'和以风尚酒店',
location:'浦东机场核心区',
utility:['行李寄存',' 闪住',' 免费停车',' 接机服务'],
comment:['','','','','','','','','','','','','','','','','','','','','',''],
score:4.5,
price:354,
imgUrl:require('../asstes/hotelImg/hotel6.jpg'),
distance:13,
isRecommend:true,
  address:'中国，上海，浦东区，南仓街118号',
  HotelDetail:{
    beginTime:2021,
    detail:'酒店位于南浦大桥地铁站周边，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel6.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room1.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['14:00','12:00'],
  room:[{
      name:'风尚大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'18m'},{window:'有窗'}],
      priceType:[{breakfast0:658,isCancel:true,instantConfirm:true},{breakfast1:678,isCancel:true,instantConfirm:true},{breakfast2:698,isCancel:true,instantConfirm:true}],
      inventory:3,
      label:['大床房','立即取消','免费取消']
  },
  {   
      
      name:'月风尚双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'风尚豪华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:7,
      label:['套房','立即取消','免费取消']
  }]
},
{
id:'007',
hotelName:'上海兴华宾馆',
location:'浦东机场核心区',
utility:['行李寄存',' 闪住',' 免费停车',' 接机服务','咖啡厅'],
comment:['','','','','',,'','','','','','','','','','','',,'','','','','','','','','','','',,'','','','','','','','','','','',],
score:4.7,
price:1154,
imgUrl:require('../asstes/hotelImg/hotel7.jpg'),
distance:92,
isRecommend:true,
  address:'中国，上海，浦东区，南仓街118号',
  HotelDetail:{
    beginTime:2021,
    detail:'酒店位于南浦大桥地铁站周边，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel7.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room1.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['14:00','12:00'],
  room:[{
      name:'兴华豪华大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'18m'},{window:'有窗'}],
      priceType:[{breakfast0:658,isCancel:true,instantConfirm:true},{breakfast1:678,isCancel:true,instantConfirm:true},{breakfast2:698,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['大床房','立即取消','免费取消']
  },
  {   
      
      name:'兴华精选双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:2,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'兴华阳光豪华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:858,isCancel:true,instantConfirm:true},{breakfast1:878,isCancel:true,instantConfirm:true},{breakfast2:898,isCancel:true,instantConfirm:true}],
      inventory:7,
      label:['套房','立即取消','免费取消']
  }]
},
{
id:'008',
hotelName:'kacha酒店',
location:'浦东机场核心区',
utility:['行李寄存',' 闪住',,'咖啡厅',' 免费停车',' 接机服务'],
comment:['','','','',''],
score:4.8,
price:1354,
imgUrl:require('../asstes/hotelImg/hotel8.jpg'),
distance:14,
isRecommend:true,
  address:'中国，上海，浦东区，南仓街118号',
  HotelDetail:{
    beginTime:2021,
    detail:'酒店位于南浦大桥地铁站周边，自助洗衣房，健身房，餐厅，咖啡吧等...'
  },
  imgs:[
    ['hotel1_0',require('../asstes/hotelImg/hotel8.jpg')],
    ['hotel1_1',require('../asstes/roomImg/room1.jpg')],
    ['hotel1_2',require('../asstes/roomImg/room2.jpg')],
    ['hotel1_3',require('../asstes/roomImg/room3.jpg')]
  ],
  imgsRight:[
    ['room_1',require('../asstes/roomImg/room1.jpg')],
    ['room_2',require('../asstes/roomImg/room2.jpg')],
    ['room_3',require('../asstes/roomImg/room3.jpg')],
    ['room_4',require('../asstes/roomImg/room4.jpg')],
  ],
  inOutTime:['14:00','12:00'],
  room:[{
      name:'月若流金豪华大床房',
      img:require('../asstes/roomImg/bigBed.jpg'),
      describe:[{size:'1张1.8米大床'},{area:'18m'},{window:'有窗'}],
      priceType:[{breakfast0:1354,isCancel:true,instantConfirm:true},{breakfast1:1378,isCancel:true,instantConfirm:true},{breakfast2:1394,isCancel:true,instantConfirm:true}],
      inventory:13,
      label:['大床房','立即取消','免费取消']    
  },
  {   
      name:'月若流金精选双床房',
      img:require('../asstes/roomImg/twobed.jpg'),
      describe:[{size:'2张1.2米单人床'},{area:'26.5m'},{window:'有窗'}],
      priceType:[{breakfast0:1454,isCancel:true,instantConfirm:true},{breakfast1:1478,isCancel:true,instantConfirm:true},{breakfast2:1508,isCancel:true,instantConfirm:true}],
      inventory:1,
      label:['双床房','立即取消','免费取消']
  },
  {
      name:'加州阳光豪华套房',
      img:require('../asstes/roomImg/taoroom.jpg'),
      describe:[{size:'1张1.8米单人床'},{area:'36m'},{window:'有窗'}],
      priceType:[{breakfast0:2058,isCancel:true,instantConfirm:true},{breakfast1:2068,isCancel:true,instantConfirm:true},{breakfast2:2078,isCancel:true,instantConfirm:true}],
      inventory:7,
      label:['套房','立即取消','免费取消']
  }]
}]
//get请求
export default [
    // 接口一：酒店信息  baseURL+"hotel"
    {
      url:baseURL+"hotel",
      type: "get",
      response: () => {
        return {
          code: 200,
          data: {
            fileList,
          },
        };
      },
    },
    // 接口二：通过酒店id，返回该酒店信息 baseURL+"hotelInfo"
    {
      url: RegExp(baseURL+"hotelInfo"+ ".*"),
      type: "get",
      response: (data) => {
        // console.log('22222',JSON.parse(data.body).id)
        let resData={}
        let getId=JSON.parse(data.body).id
        for(let i=0;i<fileList.length;i++){
          if(fileList[i].id==getId){
            resData=fileList[i]
          }
        }
        return {
          code: 200,
          data: resData
        };
      },
    },
    // 接口三：通过酒店id和房间名，减少房间库存，更新数据
    {
      url: RegExp(baseURL+"inventory"+ ".*"),
      type: "get",
      response: (data) => {
        let resData={}
        let getId=JSON.parse(data.body).id
        let getRoomName=JSON.parse(data.body).room
        // 库存-1
        for(let i=0;i<fileList.length;i++){
          if(fileList[i].id==getId){
            for(let j=0;j<fileList[i].room.length;j++){
              if(fileList[i].room[j].name==getRoomName){
                fileList[i].room[j].inventory-=1
                // console.log(fileList[i].room,fileList[i].room[j].inventory)
              }
            }
            resData=fileList[i]
          }
        }
        // 返回库存减少后的数据
        return {
          code: 200,
          data: resData //返回更新后的数据
        };
      },
    }
];

