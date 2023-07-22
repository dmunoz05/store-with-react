import { useContext } from "react";
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from "../../Context";
import OrdersCard from "../../Components/OrdersCard";
import Layout from "../../Layout";

function MyOrders() {
    const context = useContext(ShoppingCartContext);

    return (
        <Layout>
            <div className='flex w-80 items-center relative justify-center mb-4'>
                <h1 className='font-medium text-xl'>My Orders</h1>
            </div>
            {
                context.order.map((order, index) => {
                    return (
                        <Link key={index} to={`/my-orders/${index}`}>
                            <OrdersCard key={index} totalPrice={order.totalPrice}
                                totalProducts={order.totalProducts} />
                        </Link>
                    )
                })
            }
        </Layout>
    );
}

export default MyOrders;