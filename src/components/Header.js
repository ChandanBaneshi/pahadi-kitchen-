import React,{useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { DLT } from '../redux/actions/action';

import { NavLink } from 'react-router-dom';

const Header = () => {

  const  [price, setPrice] = useState(0);

  const getdata = useSelector((state)=> state.cartreducer.carts);
  console.log(getdata)

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);



  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id)=>{
    dispatch(DLT(id))
  }

  const total = ()=>{
    let price = 0;
    getdata.map((ele,k)=>{
      price = ele.price * ele.qnty + price
    });
    setPrice(price);
  };

  useEffect(() => {
    
      total();
    
  }, [total]);


  return (
    <>
            <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-4" >PAHADI KITCHEN</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
        
          </Nav>
          <Badge badgeContent={getdata.length} color="primary"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
          >
          <i class="fa-solid fa-cart-shopping text-light" style={{fontSize:25, cursor:"pointer"}}></i>
</Badge>
          
        </Container>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >


        {
          getdata.length ?
          <div className="card_details" style={{width:"24rem",padding:10}}>
            <Table>
              <thead>
                <tr>
                  <th>Photose</th>
                  <th>Resturant Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  getdata.map((e)=>{
                    return(
                      <>
                      <tr>
                        <td>
                          <NavLink to ={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="" />
                          </NavLink>
                          
                        </td>
                        <td>
                          <p>{e.rname} </p>
                          <p>price :{e.price} ₹ </p>
                          <p>Quantity :{e.qnty} </p>
                          <p style={{color:"red",fontsize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                            <i className='fas fa-trash smalltrash'></i>
                          </p>
                        </td>
                        <td className='mt-5' style={{color:"red",fontsize:20, cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                        <i className='fas fa-trash largetrash'></i>
                        </td>
                      </tr>
                      </>
                    )
                  })
                }
                <p className='text-center'>Total : {price} ₹</p>
              </tbody>
            </Table>
          </div>:


<div className='card_details d-flex justify-content-center align-item-center' style={{width:"24rem",padding:10,position:"relative"}}>
<i className='fas fa-close smallclose' 
onClick={handleClose}
style={{position:"absolute", top:2,right:20,fontsize:23,cursor:"pointer"}}></i>
<p style={{fontsize:22}}>YOUR CARD IS EMPTY</p>
</div>
        }

      
      </Menu>

      </Navbar>

    </>
  );
}

export default Header;
