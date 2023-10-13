import React from 'react';

export default function Home() {

  const token = sessionStorage.getItem("ftbysptoken")
  // const baseHeaders = {
  //   headers: {
  //     'token': token
  //   }
  // }

  return (
    <div>
    {token ? (
    <></>
    ) : (
    <>
          <h1 className="text-bg-secondary"style={{ textAlign: 'center', marginTop: '5%' }}>Please login to use the Family Tree</h1>
    </>
    )}
    </div>
  );
}
