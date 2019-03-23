import React, { Component } from 'react';
import DishComp from './DishComp'
import db from '../Json/food.json'

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: "false",
            tab: "Food",
            render: 1
        }
    }

    componentWillMount() {
        this.ListDish = [];
        this.dataFromDBToList();
    }

    componentDidMount() {
        this.tabFood = this.refs.tabFood;
        this.tabFruice = this.refs.tabFruice;
        this.Dishes = document.getElementsByClassName('Dish');
        this.MenuFood = this.refs.MenuFood;
        this.MenuFruice = this.refs.MenuFruice;
        this.txtSearch = this.refs.txtSearch;
        this.btnSearch = this.refs.btnSearch;
        this.btnAddFood = this.refs.btnAddFood;
        this.btnAddFruice = this.refs.btnAddFruice;
        this.fileNewDishImage = this.refs.fileNewDishImage;
        this.modalBody = this.refs.NewDish_modalBody;
        this.imgNewDish = this.refs.image_newDish;
        this.txtNameNewDish = this.refs.txtNewDish;
        this.txtPriceNewDish = this.refs.PriceNewDish;
        this.acceptAddDish = this.refs.acceptAddDish;
        this.clickLabelFood();
        this.AddDish_chooseImage();
        this.clickAcceptAddDish();
        this.clickSearch();
    }

    dataFromDBToList() {
        db.map((value, key) => {
            let newDish = {
                id: value.id,
                category: value.category,
                name: value.name,
                price: value.price
            };
            this.ListDish.push(newDish);
        });
    }

    clickSearch(category) { 
        this.btnSearch.addEventListener('click', function () {
            let strSearch = this.txtSearch.value;
            let arrResult = [];
            if (strSearch.length > 0) {
                this.ListDish.forEach(aDish => {
                    if (aDish.name.indexOf(strSearch) >= 0)
                        arrResult.push(aDish);  
                });
                this.ListDish = arrResult;
                console.log(this.ListDish);
            }
            else
                this.ListDish = db;

            this.setState({
                render: 3
            });
        }.bind(this));
    }

    AddDish_chooseImage() {
        this.fileNewDishImage.addEventListener('change', function () {
            var arr = this.fileNewDishImage.value.split('\\');
            if (this.state.tab == "Food")
                this.imgNewDish.src = "./img/ListFood/" + arr[arr.length - 1];
            else
                this.imgNewDish.src = "./img/ListFruice/" + arr[arr.length - 1];
        }.bind(this), false);
    }

    clickAcceptAddDish() {
        this.acceptAddDish.addEventListener('click', function () {
            if (window.confirm("Bạn có muốn thêm món này")) {
                let dishName = this.txtNameNewDish.value;;
                let dishPrice = this.txtPriceNewDish.value;
                let img = this.imgNewDish.src;
                let arr = img.split('/');
                let ADish = {
                    id: arr[arr.length - 1][0],
                    category: this.state.tab,
                    name: dishName,
                    price: dishPrice
                }
                this.ListDish.push(ADish);
            }
            this.setState({
                render: 3
            });
        }.bind(this))
    }

    clickLabelFood() {
        this.tabFood.addEventListener('click', function () {
            this.tabFood.style.borderBottom = "3px solid #0073e6";
            this.tabFood.style.color = "#0073e6";
            this.tabFruice.style.borderBottom = 'none';
            this.tabFruice.style.color = "black";
            this.MenuFood.style.display = "inline";
            this.MenuFruice.style.display = "none";
            this.setState({
                tab: 'Food'
            })
            this.resetStatus();
        }.bind(this));

        this.tabFruice.addEventListener('click', function () {
            this.tabFruice.style.borderBottom = "3px solid #0073e6";
            this.tabFruice.style.color = "#0073e6";
            this.tabFood.style.borderBottom = 'none';
            this.tabFood.style.color = "black";
            this.MenuFood.style.display = "none";
            this.MenuFruice.style.display = "inline";
            this.setState({
                tab: 'Fruice'
            })
            this.resetStatus();
        }.bind(this));
    }

    edit(src, name, price){
        const image_NewDish = this.refs.image_newDish;
        const name_NewDish = document.getElementsByClassName('NewDish-txtName');
        const price_NewDish = document.getElementsByClassName('NewDish-nbmPrice');
        image_NewDish.src = src;
        name_NewDish[0].value = name;
        price_NewDish[0].value = price;
    }

    showListDish(listDish, category) {
        return (
            listDish.map((value, key) => {
                if (value.category === category)
                    return <DishComp funcEdit = {this.edit.bind(this)} key={key} name={value.name} price={value.price} src={'../img/List' + category + "/" + value.id + ".jpg"} />
            })
        )
    }

    resetDish() {
        for (let i = 0; i < this.Dishes.length; i++) {
            this.Dishes[0].remove();
        }
    }

    resetStatus() {
        for (let i = 0; i < this.Dishes.length; i++) {
            let btn = this.Dishes[i].getElementsByClassName('btn');
            btn[0].style.display = "none";
            btn[1].style.display = "none";
        }
    }

    render() {
        return (
            <div id="Menu">
                <div id="Menu-header">
                    <div ref="tabFood" className="Menu-tab Food" >ĐỒ ĂN</div>
                    <div ref="tabFruice" className="Menu-tab Fruice" >ĐỒ UỐNG</div>
                    <input type="text" className="txt-search" ref="txtSearch" placeholder="Tìm kiếm" />
                    <button type="button" ref="btnSearch" className="btn btn-Search">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
                <div id="Menu-main">
                    <div ref="MenuFood" id="Menu-Food">
                        {
                            this.showListDish(this.ListDish, "Food")
                        }
                        <div ref="btnAddFood">
                            <div className="btn-Add" data-toggle="modal" data-target="#modalAdd">
                                <div className="txtAdd">+</div>
                                <div className="opacity"></div>
                            </div>
                        </div>
                    </div>
                    <div ref="MenuFruice" id="Menu-Fruice">
                        {
                            this.showListDish(this.ListDish, "Fruice")
                        }
                        <div ref="btnAddFruice">
                            <div className="btn-Add" data-toggle="modal" data-target="#modalAdd">
                                <div className="txtAdd">+</div>
                                <div className="opacity"></div>
                            </div>
                        </div>
                    </div>
                    <div id="modalAdd" className="modal fade" tabIndex={10} role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Thông tin món</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body" ref="NewDish_modalBody" id="modalBody-themMon">
                                    <div id="lbl-NewDish">
                                        <div className="lbl NewDish-Name">Tên món: </div>
                                        <div className="lbl NewDish-Price">Giá: </div>
                                    </div>
                                    <div id="input-NewDish">
                                        <input type="text" ref="txtNewDish" className="NewDish-txtName" placeholder="Tên món mới" defaultValue=""></input>
                                        <input type="number" ref="PriceNewDish" className="NewDish-nbmPrice" name="quantity" min={0} max={10000000} placeholder="Giá" />
                                    </div>
                                    <div id="lbl-imgNewDish">
                                        <div className="lbl NewDish-urlImage">Link của ảnh</div>
                                        <div className="lbl NewDish-chooseImg">Chọn ảnh</div>
                                    </div>
                                    <div id="input-imgNewDish">
                                        <input type="text" className="txt-urlImage" placeholder="url of image"></input>
                                        <input type="file" ref="fileNewDishImage" id="file-newDishImage" ></input>
                                        <img ref="image_newDish" name="new Dish" className="NewDish-img" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" ref="acceptAddDish" className="btn-accept-image" value="Xác nhận" />
                                </div>
                            </div>{/* /.modal-content */}
                        </div>{/* /.modal-dialog */}
                    </div>{/* /.modal */}
                </div>
            </div>
        );
    }
}

export default Menu;