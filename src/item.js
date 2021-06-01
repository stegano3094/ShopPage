function item(i) {
    <div className="col-md-4">
        <img src={shoes[i].image_url} width="100%"/>
        <h4> {shoes[i].title} </h4>
        <p>{shoes[i].content} 가격: {shoes[i].price}</p>
    </div>
}