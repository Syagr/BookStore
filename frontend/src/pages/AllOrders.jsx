import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { IoOpenOutline } from 'react-icons/io5';
import { FaCheck, FaUserLarge } from 'react-icons/fa';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
	const [AllOrders, setOrders] = useState([]);
	const [Option, setOption] = useState(-1);
	const [Value, setValue] = useState({ status: '' });
	const [userDiv, setUserDiv] = useState('hidden');
	const [userDivData, setUserData] = useState();

	const headers = {
		id: localStorage.getItem('id'),
		authorization: `Bearer ${localStorage.getItem('token')}`,
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/v1/get-all-orders', { headers });
				setOrders(response.data.data);
			} catch (error) {
				console.error('Failed to fetch orders:', error);
			}
		};
		fetch();
	}, []);

	const change = (e) => {
		const { value } = e.target;
		setValue({ status: value });
	};

	const submitChanges = async (i) => {
		const id = AllOrders[i]._id;
		try {
			const response = await axios.put(`http://localhost:5000/api/v1/update-status/${id}`, Value, { headers });
			alert(response.data.message);
			setOption(-1); // Reset option after updating
		} catch (error) {
			console.error('Failed to update order status:', error);
		}
	};

	const handleUserDiv = (user) => {
		setUserDiv('fixed');
		setUserData(user);
	};

	return (
		<>
			{!AllOrders.length && <Loader />}
			{AllOrders.length === 0 && (
				<div>
					<h2 className="text-3xl font-bold mb-4">All Orders</h2>
					<div>
						<div><h1>Sr.</h1></div>
						<div><h1>Books</h1></div>
						<div><h1>Description</h1></div>
						<div><h1>Price</h1></div>
						<div><h1>Status</h1></div>
						<div><h1><FaUserLarge /></h1></div>
					</div>
				</div>
			)}
			{AllOrders.map((item, i) => (
				<div key={item._id}>
					<h1>{i + 1}</h1>
					<div>
						<Link to={`/view-book-details/${item.book._id}`}>{item.book.title}</Link>
					</div>
					<div>
						<h1>{item.book.desc.slice(0, 50)} ...</h1>
					</div>
					<div>
						<h1>{item.book.price}</h1>
					</div>
					<div>
						<h1>
							<button onClick={() => setOption(i)}>
								<div className={item.status === 'Order Placed' ? 'text-yellow-500' : item.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}>
									{item.status}
								</div>
							</button>
							<div className={Option === i ? 'block' : 'hidden'}>
								<select name='status' className='w-full' onChange={change} value={Value.status}>
									{['Order Placed', 'Order for Delivery', 'Order Delivered', 'Delivered', 'Cancelled'].map((status, index) => (
										<option key={index} value={status}>{status}</option>
									))}
								</select>
								<button className='text-green-500 hover:text-pink-600 mx-2' onClick={() => submitChanges(i)}>
									<FaCheck />
								</button>
							</div>
						</h1>
					</div>
					<div>
						<button onClick={() => handleUserDiv(item.user)}>
							<IoOpenOutline />
						</button>
					</div>
				</div>
			))}
			{userDivData && (
				<SeeUserData
					userDivData={userDivData}
					userDiv={userDiv}
					setUserDiv={setUserDiv}
				/>
			)}
		</>
	);
};

export default AllOrders;
