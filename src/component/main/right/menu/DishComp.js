import React, { Component } from 'react';

class DishComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            option: "false"
        }
    }

    componentDidMount(){
        this.btnOption = this.refs.optionDish;
        this.btnEdit = this.refs.btnEdit;
        this.btnRemove = this.refs.btnRemove;
        this.Dish = this.refs.Dish;
        this.clickOption();
        this.clickRemove();
        this.clickEdit();
    }

    clickOption(){
        this.btnOption.addEventListener('click',function(){
            console.log(this.state.option);
            if(this.state.option == "true"){
                this.btnEdit.style.display = "none";
                this.btnRemove.style.display = "none";
                this.state.option = "false";
            }else if(this.state.option == "false"){
                this.btnEdit.style.display = "inline";
                this.btnRemove.style.display = "inline";
                this.state.option = "true";
            }
        }.bind(this));
    }

    clickRemove(){
        this.btnRemove.addEventListener('click',function(){
            this.Dish.remove();
        }.bind(this));
    }

    clickEdit(){
        this.btnEdit.addEventListener('click',function(){
            console.log(this.props.src+"---"+this.props.name);
            this.props.funcEdit(this.props.src, this.props.name, this.props.price);
            this.Dish.remove();
        }.bind(this));  
    }

    render() {
        return (
            <div ref="Dish" className="Dish">
                <img className="Dish-img" src={this.props.src} alt="img" />
                <i ref="optionDish" className="fa fa-align-justify" aria-hidden="true"></i>
                <div id="Name-Price" className="Dish-Name-Price">
                    <div className="Dish-Name">{this.props.name}</div>
                    <div className="Dish-Price" ref="price">{this.props.price}</div>
                </div>
                <button type="button" ref="btnEdit" className="btn btn-primary" data-toggle="modal" data-target="#modalAdd">Sửa</button>
                <button type="button" ref="btnRemove" className="btn btn-danger">Xóa</button>
            </div>
        );
    }
}

export default DishComp;