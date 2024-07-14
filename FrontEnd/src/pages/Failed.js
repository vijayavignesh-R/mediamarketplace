import React from 'react'
import "../styles/PlaceOrder.css"

const Failed = (props) => {
    const goPayment = () =>{
        props.history.push(`/payment`);
    }
    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
            <div className="container">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div className="col-md-6 mt-5">
                    <center>
                        <h1>PAYMENT FAILED</h1>
                        <button type="button" onClick={goPayment}
                            className="placeorder-btn">
                                Back to Payment Method
                        </button>
                    </center>    
                    </div>
                    <div class="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}

export default Failed
