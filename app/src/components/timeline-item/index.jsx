import './index.css'

export const TimelineItem = (props) => {
    return <div className="timeline__item">
    <p>ユーザー名：{props.userName}</p>
    <pre>{props.content}</pre>
  </div>   
}