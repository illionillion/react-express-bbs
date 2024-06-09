import './index.css'

export const TimelineItem = (props) => {
    return <div className="timeline__item">
    <p>ユーザー名：{props.userName}</p>
    <p>内容：{props.content}</p>
  </div>   
}