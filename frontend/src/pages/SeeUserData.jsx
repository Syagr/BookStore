import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
	return (
		<div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${userDiv}`}>
			<div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-bold">User Information</h1>
					<button onClick={() => setuserDiv('hidden')}>
						<RxCross1 />
					</button>
				</div>
				<div className="mt-4">
					{userDivData ? ( // Conditional rendering for user data
						<>
							<div className="mb-2">
								<label className="font-semibold">Username:</label>
								<p>{userDivData.username}</p>
							</div>
							<div className="mb-2">
								<label className="font-semibold">Email:</label>
								<p>{userDivData.email}</p>
							</div>
							<div className="mb-2">
								<label className="font-semibold">Address:</label>
								<p>{userDivData.address}</p>
							</div>
						</>
					) : (
						<p>No user data available.</p> // Fallback message
					)}
				</div>
			</div>
		</div>
	);
};

export default SeeUserData;
