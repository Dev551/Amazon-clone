import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  // console.log(basket);
  const [orders, setOrders] = useState([]);

  // const [orders, setOrders] = useState([
  //   {
  //     id: "12321341",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
  //     price: 11.96,
  //     rating: 5,
  //     title:
  //       "The Lean Startup:  How Constant Innovation Creates Radically Successful Businesses Paperback",
  //   },
  //   {
  //     id: "49538094",
  //     image:
  //       "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
  //     price: 239,
  //     rating: 4,
  //     title:
  //       "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
  //   },
  // ]);
  // console.log(orders);

  const getData = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", user?.uid, "orders")
    );

    let productData = [];
    querySnapshot.forEach((doc) => {
      const obj = { id: doc.id, data: doc.data().basket };
      productData.push(obj);
    });
    setOrders(productData);
  };

  useEffect(() => {
    console.log("User =>", user);

    if (user) {
      getData();
    } else {
      setOrders([]);
    }
  }, [user]);
  console.log(orders);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
