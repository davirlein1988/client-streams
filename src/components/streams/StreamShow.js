import React, {Component} from 'react'
import { connect } from 'react-redux';
import { fetchstream } from '../../actions/index';
import flv from 'flv.js'

class StreamShow extends Component {
    constructor(props){
        super(props)
        this.videoRef = React.createRef()
    }
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchstream(id)
        this.createPlayer()
    }
    componentDidUpdate() {
        this.createPlayer()
    }
    componentWillUnmount() {
        this.player.destroy()
    }
    
    
    createPlayer() {
        if (this.player || !this.props.stream) {
            return
        }
        const { id } = this.props.match.params
        
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }
    render() { 
        const { stream } = this.props
        if(!stream) return <div>Loading...</div>
        return (
            <div>
                <video 
                ref={this.videoRef} 
                style={{width: '100%'}}
                controls
                />
                <h1>
                    {stream.title}
                </h1>
                <h5>{stream.description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchstream})(StreamShow);