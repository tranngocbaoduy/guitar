// file Rect.js
import React from 'react'

export default class Rect extends React.Component {

  constructor (props) {
    super(props)
    // state object
    this.state = { number : this.props.num }    
  }

  componentWillMount () {
    // giá trị thuộc tính  trong props
    const { num, bgcolor } = this.props

    // CSS style viết thuộc tính bằng camle case
    this.rectStyle = {
      background: bgcolor,
      display: 'table-cell',
      border: '1px #000 solid',
      fontSize: 20,
      width: 30,
      height: 30,
      textAlign: 'center',
      verticalAlign: 'center',
      marginLeft:'100px',
    }

  }

  // count up
  countUp (num) {
    // cập nhật tham số của state object → render method được gọi và vẽ lại
    this.setState({ number : num + 1 })
  }

  render () {

    // trường hợp mà nhiều dòng sẽ bao bọc bởi cặp ()
    // chỉ một DOM trên cùng sẽ trả về
    return (
      <div style={ this.rectStyle } onClick={(e)=> this.countUp(this.state.number)}>
        <span style={{ color : '#eeeeee' }}>{this.state.number}</span>
      </div>
    )
  }
}