import React from 'react';
import './Breadcrumbs.css';

function Breadcrumbs(props) {
    return (
        <div className="breadcrumbs">
            <div className="page-header" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/banner1.jpg)` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="breadcrumb-wrapper">
                                <h2 className="product-title">{props.subBreadcrumbs}</h2>
                                <ol className="breadcrumb">
                                    <li><a href="/">{props.mainBreadcrumbs} /</a></li>
                                    <li className="current">{props.subBreadcrumbs}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumbs;