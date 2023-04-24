import React, { useState, useEffect } from "react";
import { Button, List, Popconfirm } from "antd";
import { $selectByUid, $del } from "../../../api/OrderApi";
import { useSelector } from "react-redux";
import MyNotification from "../../../components/MyNotification/MyNotification";

export default function OrderTocomment() {
  //获取登录信息子模块
  const userSlice = useSelector((state) => state.userSlice);
  const user = userSlice.user;
  //订单数据
  const [orderList, setOrderList] = useState([]);
  const loadList = () => {
    $selectByUid(user.uid).then((data) => {
      data = data.newfileList.map((r) => {
        if (r.statemsg == "待评价") {
          return {
            ...r,
            key: r.oid,
          };
        } else {
          return;
        }
      });
      setOrderList(data.filter(Boolean));
    });
  };
  useEffect(() => {
    loadList();
  }, []);

  const onLoadMore = () => {
    // setLoading(true);
    // setList(
    //   data.concat(
    //     [...new Array(count)].map(() => ({
    //       loading: true,
    //       name: {},
    //       picture: {},
    //     }))
    //   )
    // );
  };
  const loadMore = (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  );
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

  const cancel = (oid) => {
    //取消订单
    $del(oid).then((data) => {
      if (data.code == 200) {
        setNotiMsg({ type: "success", description: "订单取消成功" });
        loadList();
      } else {
        setNotiMsg({ type: "error", description: "订单取消失败" });
      }
    });
  };
  const comment = (e) => {
    setNotiMsg({ type: "success", description: "模块待完善,敬请期待！" });
  };

  return (
    <>
      <List
        style={{ minHeight: 350 }}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={orderList}
        renderItem={(item) => (
          <>
            <List.Item>
              <List.Item>
                <div style={{ marginLeft: 20 }}>
                  <div>
                    <img
                      style={{ marginRight: 20, width: 30 }}
                      src={item.img}
                    />
                    {item.oname}
                  </div>
                  <div style={{ marginLeft: 50 }}>
                    <div>{item.location}</div>
                    <div>
                      {item.starttime}至{item.endtime}
                    </div>
                  </div>
                </div>
              </List.Item>
              <List.Item style={{ marginRight: 50 }}>
                <div>
                  <div style={{ color: "#1890ff" }}>{item.statemsg}</div>
                  <div>在线付:￥{item.price}</div>
                  {item.state == "done" ? null : (
                    <>
                      <Popconfirm
                        title="系统确认"
                        description="确定取消该订单?"
                        onConfirm={() => {
                          cancel(item.oid);
                        }}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button style={{ marginTop: 20 }}>取消</Button>
                      </Popconfirm>
                    </>
                  )}
                  {item.statemsg == "待评价" ? (
                    <Button
                      style={{ marginTop: 20 }}
                      onClick={() => comment(item.oid)}
                    >
                      去评价
                    </Button>
                  ) : null}
                </div>
              </List.Item>
            </List.Item>
          </>
        )}
      />

      <MyNotification notiMsg={notiMsg}></MyNotification>
    </>
  );
}
