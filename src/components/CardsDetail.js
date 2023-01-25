import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DLT, ADD, REMOVE } from "../redux/actions/action";
import "./Style.css";

const CardsDetail = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();

  const history = useNavigate();

  const dispatch = useDispatch();

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };
  
  // add data
  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  };

  // remove one 
  const remove = (item)=>{
    dispatch(REMOVE(item))
  }

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Item Detail</h2>

        <section className="container mt-4 ">
          <div className="itemsdetails d-flex">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img src={ele.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Resturant</strong> : {ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : {ele.price} ₹
                          </p>
                          <p>
                            <strong>Dishes</strong> : {ele.address}
                          </p>
                          <p>
                            <strong>Total</strong> : {ele.price * ele.qnty} ₹
                          </p>
                          <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:100,cursor:"pointer",background:"#ddd", color:"#111"}}>
                            <span style={{fontSize:30}} onClick={ele.qnty <=1 ?()=>dlt(ele.id) : ()=>remove(ele)}>-</span>
                            <span style={{fontSize:26}}>{ele.qnty}</span>
                            <span style={{fontSize:30}} onClick={()=>send(ele)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating</strong>:
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review</strong>:
                            <span>{ele.somedata} </span>
                          </p>
                          <p>
                            <strong>Remove</strong>{" "}
                            <span>
                              <i
                                className="fas fa-trash"
                                onClick={() => dlt(ele.id)}
                                style={{
                                  color: "red",
                                  fontsize: 20,
                                  cursor: "pointer",
                                }}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetail;
