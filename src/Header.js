import React, { Component } from 'react';
import './App.css';
import {Navbar,FormGroup,Button,FormControl,Nav,NavDropdown,NavItem,MenuItem} from 'react-bootstrap';
import Api from './Api';
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
        content: [],
        contentLogin: [],
    }
    this.loadCategory = this.loadCategory.bind(this);
    this.loadLogin = this.loadLogin.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  loadCategory() {
    Api.get("http://127.0.0.1:8000/getAllCategory", '')
        .then((result) => {
            if(result.status){
                this.setState({
                    content:  result.categories,
                });
            }
        })
  }

  buildContent() {
    let _content = [];
    let cate = this.state.content;
    for(var i in cate) { 
      let href = '/productCateId/' +cate[i].id;
      _content.push(<MenuItem key={'2.'+i} href={href}>{cate[i].name}</MenuItem>);
    }
    let _cateContent = [];
    _cateContent.push(<NavDropdown key={2} title="Products" id="mydrop">{_content}</NavDropdown>);
    _cateContent.push(<NavDropdown key={4} className="header-layout" id="123" title="About Us" ><MenuItem eventKey={2.5} href="/contact">Contact</MenuItem><MenuItem eventKey={2.6} href="/video">Video</MenuItem></NavDropdown>);
    return _cateContent;
  }

  logout(){
    localStorage.removeItem("tokenCustomer");
    window.location.assign('/');
  }

  loadLogin(){
    let checkLogin = localStorage.getItem("tokenCustomer");
    let _content = [];
   
    if(checkLogin!= null){

      let data = {
        token: checkLogin
      }
      Api.get("http://127.0.0.1:8000/checkLogin", data)
              .then((result) => {
                  if(result.status){
                    _content.push(<Nav key={'login'} pullRight>
                        <NavDropdown id="drop"title={"Hello "+ result.customer.name}>
                          <MenuItem href="/user">
                            My Info
                          </MenuItem>
                          <MenuItem href="/cart">
                            My Cart
                          </MenuItem>
                          <MenuItem onClick={this.logout}>
                            LogOut
                          </MenuItem>
                        </NavDropdown>
                      </Nav>)
                  }else{
                      _content.push(<Nav key={'login'} pullRight>
                      <NavItem href="/login">
                        Login
                      </NavItem>
                      <NavItem href="/signUpPage">
                        Sign Up
                      </NavItem>
                    </Nav>)
                  }
                  this.setState({
                    contentLogin: _content
                  })
              })
    }else{
      _content.push(<Nav key={'login'} pullRight>
          <NavItem href="/login">
            Login
          </NavItem>
          <NavItem href="/signUpPage">
            Sign Up
          </NavItem>
        </Nav>)
      
      this.setState({
        contentLogin: _content
      })
    }
  }

  componentDidMount() {
    this.loadLogin();
    this.loadCategory();

    window.jQuery('#search').autocomplete({
      source: function (request, response) {
        let data= {
          term: request.term
      }
      Api.get("http://127.0.0.1:8000/searchAutoComplete", data)
        .then((rs) => {
          response(window.jQuery.map(rs, function (value, key) {
            return {
                label: value.name,
                value: value.name,
                id: value.id,
                image: value.image,
            }
          }));
        });
      },
      minLength: 1,
      autoFocus: true,
      select: function (ui) {
        window.jQuery('#search-id').val(ui.item.id);
        window.jQuery('.search-form').click(function(){
        window.location.assign('/product/'+ window.jQuery('#search-id').val());
        });
      },
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
      
      let html = '';
      let url = '/product/'+ item.id;
      let image = "/assets/images/product/"+item.image;
      html += '<table class="directProductDetail"><input type="hidden" value='+url+'><tr><td width="30%"><img style="width:100px"src='+image+'></td><td style="color:black">'+item.value+'</td><td></td></tr></table>';
      window.jQuery('table').click(function(){
        window.jQuery('#search-id').val(item.id);
      
        let url = window.jQuery(this).children('input').val();
        window.location.assign(url);
      });
      return  window.jQuery("<li style='list-style-type: none;width:10%'>").data("ui-autocomplete-item", item).append(html).appendTo(ul);
    };

   

  
  } 


  render() {
    return (
      
      <div>
          <meta name="csrf-token" content="{{ csrf_token() }}"></meta>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a  href="/">Guitar 4U</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">
                Home
              </NavItem>
              {this.buildContent()}
            </Nav>
            
           
            {this.state.contentLogin}
            <Navbar.Form pullRight >
                <FormGroup >
                  <FormControl type="text" id="search" placeholder="Search" />
                  <FormControl type="hidden" id="search-id" name="id"/>
                </FormGroup>
                <Button type="button" className="search-form" >Search</Button>
              </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
