import React, { Component } from 'react';
import DishComp from './DishComp'
import db from '../Json/food.json'

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            tab: "Food",
            render: 1
        }
        this.food_name_old = ""
        this.init();
    }

    init() {
        this.foods = [];
        this.drinks = [];
        this.arrFood = [];
        this.arrDrink = [];
        this.loadData();
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
        // this.acceptAddDish = this.refs.acceptAddDish;
        this.clickLabelFood();
        this.AddDish_chooseImage();
    }

    loadData() {
        fetch("http://localhost:3001/dashboard/menu", {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
            referrer: 'no-referrer'
        }).then(response => response.json())
            .then(data => {
                data[0].map((value, key) => {
                    this.foods.push(value);
                })
                this.arrFood = this.foods;
                data[1].map((value, key) => {
                    this.drinks.push(value);
                })
                this.arrDrink = this.drinks;
                this.reRender();
            })
    }

    postData(url, data) {
        console.log(data)
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(data => {
            alert('Thay đổi thành công')
        })
    }

    clickSearch() {
        let strSearch = this.txtSearch.value;
        let listDish = this.state.tab === 'Food' ? this.foods : this.drinks;
        console.log(listDish);
        if (strSearch.length > 0) {
            if (this.state.tab === 'Food') {
                this.arrFood = [];
                listDish.forEach(aDish => {
                    
                    if (aDish.food_name.indexOf(strSearch) >= 0)
                        this.arrFood.push(aDish);
                })
            } else {
                this.arrDrink = [];
                listDish.forEach(aDish => {
                    
                    if (aDish.food_name.indexOf(strSearch) >= 0)
                        this.arrDrink.push(aDish);
                });
            }
        } else {
            this.arrFood = this.foods;
            this.arrDrink = this.drinks;
        }
        this.setState({
            render: 3
        });
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
        if (window.confirm("Bạn có muốn thêm món này")) {
            let dishName = this.txtNameNewDish.value;
            let dishPrice = this.txtPriceNewDish.value;
            let img = this.imgNewDish.src;

            let arr = img.split('/');
            let index = arr[arr.length - 1].indexOf('.')
            let id_food = arr[arr.length - 1].substring(0, index)

            let newdish = {
                id: id_food,
                category: this.state.tab === 'Food' ? 'food' : 'drinks',
                food_name: dishName,
                food_price: dishPrice
            }
            let editDish = {
                id: id_food,
                category: this.state.tab === 'Food' ? 'food' : 'drinks',
                food_name_New: dishName,
                food_price: dishPrice,
                food_name_Old: this.food_name_old
            }
            const urlPostNewDish = 'http://localhost:3001/dashboard/menu/new';
            const urlPostEditDish = 'http://localhost:3001/dashboard/menu/edit';
            this.state.editing ? this.postData(urlPostEditDish, editDish) : this.postData(urlPostNewDish, newdish)
        }
        this.init();
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

    edit(src, name, price) {
        this.food_name_old = name
        const image_NewDish = this.refs.image_newDish;
        const name_NewDish = document.getElementsByClassName('NewDish-txtName');
        const price_NewDish = document.getElementsByClassName('NewDish-nbmPrice');
        image_NewDish.src = src;
        name_NewDish[0].value = name;
        price_NewDish[0].value = price;
        this.setState({
            editing: true
        })
    }

    renderDish(Dishes, category) {
        // const countPage = (Dishes.length/8 > 0) ? (Dishes.length/8) : (Dishes.length/8+1);
        return (
            Dishes.map((value, key) => {
                return <DishComp funcEdit={this.edit.bind(this)} key={key} name={value.food_name} parentInit={this.init.bind(this)} price={value.food_price} src={'../img/' + category + "/" + value.id + ".jpg"} />
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

    reRender() {
        this.setState({
            render: 1
        })
    }

    render() {
        return (
            <div id="Menu">
                <div id="Menu-header">
                    <div ref="tabFood" className="Menu-tab Food" >ĐỒ ĂN</div>
                    <div ref="tabFruice" className="Menu-tab Fruice" >ĐỒ UỐNG</div>
                    <input type="text" className="txt-search" ref="txtSearch" placeholder="Tìm kiếm" />
                    <button type="button" ref="btnSearch" className="btn btn-Search" onClick={this.clickSearch.bind(this)}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
                <div id="Menu-main">
                    <div ref="MenuFood" id="Menu-Food">
                        <div>
                            {
                                this.renderDish(this.arrFood, 'foods')
                            }
                        </div>
                        <div ref="btnAddFood">
                            <div className="btn-Add" data-toggle="modal" data-target="#modalAdd">
                                <div className="txtAdd">+</div>
                                <div className="opacity"></div>
                            </div>
                        </div>
                    </div>
                    <div ref="MenuFruice" id="Menu-Fruice">
                        <div>
                            {
                                this.renderDish(this.arrDrink, 'drinks')
                            }
                        </div>
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
                                    <input type="button" ref="acceptAddDish" className="btn-accept-image" value="Xác nhận" onClick={this.clickAcceptAddDish.bind(this)} />
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