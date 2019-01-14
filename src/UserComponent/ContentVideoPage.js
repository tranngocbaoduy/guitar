import React from 'react';
import '../App.css';
import {Row,Col,Image,Grid,ResponsiveEmbed} from 'react-bootstrap';
import '../css/videoPage.css';
import Guitarist from '../HomePageComponent/Guitarist';

class ContentVideoPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
          content:[],
          info:[],
        }
        this.buildContentRecommend = this.buildContentRecommend.bind(this);
        this.buildContentGuide = this.buildContentGuide.bind(this);
    }
    buildContentGuide(){
        let video = ['-1jloOs4VfM','8-C2PkPDG4s','6NRpxZT1bCo','-4QBZmgXGRk'];
        let _content = [];
        for(let i = 0;i<video.length;i++){
            _content.push(<Col lg={3} className="recommend">   <iframe title="video-hot" width="100%" height="240" src={"https://www.youtube.com/embed/"+video[i]+"?list=RDjqvmZMg4huo"} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></Col>)
        }

        let _contentVideo = [];
        _contentVideo.push(<Row><h2>Guide Guitar List</h2><hr></hr></Row>);
        _contentVideo.push( <Row >{_content}</Row>);
        return _contentVideo;
    }
    buildContentRecommend(){
        let video = ['5R5YnEbp2CU','SA35ldy92s0','8BAdhoeabUM','jqvmZMg4huo'];
        let _content = [];
        for(let i = 0;i<video.length;i++){
            _content.push(<Col lg={3} className="recommend">   <iframe title="video-hot" width="100%" height="240" src={"https://www.youtube.com/embed/"+video[i]+"?list=RDjqvmZMg4huo"} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></Col>)
        }

        let _contentVideo = [];
        _contentVideo.push(<Row><h2>Recommended List</h2><hr></hr></Row>);
        _contentVideo.push( <Row >{_content}</Row>);
        return _contentVideo;
    }

    render() {
        return (
            <div>
                <Grid>
                <Row >
                    <Col lg={3} md={2} sm={1}></Col>
                    <Col className="col-lg-6 col-md-8 col-sm-10 col-xs-12">
                        <h1 className="title-page"><b>VIDEO HOT</b></h1>
                    </Col>
                    <Col  lg={3} md={2} sm={1}></Col>
                </Row>
                </Grid>
                 <Grid>
                    <Row >
                        <Col lg={7} md={8} sm={8} xs={12}>
                        
                        <ResponsiveEmbed a16by9>
                            <embed type="image/svg+xml" src="https://www.youtube.com/embed/jqvmZMg4huo?list=RDjqvmZMg4huo" />
                        </ResponsiveEmbed>
                        </Col>
                        
                        <Col className="info-video" lg={5} md={4} sm={4} xs={12}>
                            <h3>Mình Yêu Nhau Từ Kiếp Nào? [cover] | Quang Trung | Official Music Video 4k</h3>
                            <Row>
                                <Col lg={2} className="avatar"><Image className="avatar-image" width="60px" src="https://yt3.ggpht.com/a-/AAuE7mCsDOmRbcKkJ84jW5zIjwXx6zMf4wC926l5Xw=s288-mo-c-c0xffffffff-rj-k-no"></Image></Col>
                                <Col lg={10}><p class="info"> Quang Trung Official <br></br>Published on Jul 24, 2018</p></Col>
                            </Row>
                            <Row >
                                
                                <p class="info-song">
                                Bài hát cũng là nhạc phim chính thức của web drama Ai Chết Giơ Tay do Quang Trung thủ vai Thuỵ Du.<br/>
                                Vì quá yêu thích nên Trung hát lại ca khúc này để thoã lòng yêu nhạc.<br/>
                                Mong các bạn cũng sẽ yêu thích và có những giây phút thư giãn.<br/>

                                Cùng đón xem  nhé!<br/></p>
                            </Row>
                          
                        </Col>
                    </Row> 
                     {this.buildContentGuide()} 
                    {this.buildContentRecommend()}
                </Grid> 
                <Guitarist></Guitarist>
            </div>
          );
      }
}
export default ContentVideoPage;
