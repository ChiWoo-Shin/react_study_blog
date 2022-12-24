import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [text_title, text_title_change] = useState(['재밌는 걸로 쓰자', '이거 생각보다 쉽지 않네', '그래도 재밌네']);
  let [Goood, Goood_up] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input_val, setInput_val] = useState("");
  let [clock, setClock] = useState([0,0,0]);

  
  return (
    <div className="App">
      <div className="black-nav">
        <h4>React Blog</h4>
      </div>
      {
        text_title.map(function (a, i) {
          return (
            <div className='list' key={i}>
              {/* <h4 onClick={() => { modal ? setModal(false) : setModal(true); setTitle(i)}}>{a}</h4> */}
              <h4 onClick={() => { setModal(!modal); setTitle(i) }}>{a}</h4> <button onClick={()=>{
                let copyTitle = [...text_title];
                copyTitle.splice(i,1); // splice 를 사용해서도 가능 아니 이게 더 정확할지도? 어떻게보면 얘는 key니깐
                text_title_change(copyTitle);

                let copyGoood = [...Goood];
                copyGoood.splice(i,1);
                Goood_up(copyGoood);

                let copyClock = [...clock];
                copyClock.splice(i,1);
                console.log('여기는 delete ',copyClock);
                setClock(copyClock);
              }}>삭제</button>
              <h4><span onClick={() => {
                let copyGoood = [...Goood];
                copyGoood[i] = copyGoood[i] + 1;
                Goood_up(copyGoood);
              }}>👍 {Goood[i]}</span>
              </h4>
              <p>{clock[i]}</p>
            </div>
          )
        })
      }
      <div>
          <input onChange={(e) => { setInput_val(e.target.value) }} />
          <button type="submit" onClick={()=>{
            if (input_val ===''){
              alert('입력 칸이 비었습니다.');
              return;
            }
            let copyTitle_list=[...text_title];
            copyTitle_list.unshift(input_val);
            text_title_change(copyTitle_list);

            let copyGoood = [...Goood];
            copyGoood.unshift(0);
            Goood_up(copyGoood);

            let copyClock = [...clock];
            copyClock.unshift(new Date().toLocaleTimeString());
            console.log('여기는 input ',copyClock);
            setClock(copyClock);
          }}>제출</button>
      </div>
      {
        modal ? <Modal text_title={text_title} text_title_change={text_title_change} title={title} clock={clock}/> : null
      }
    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal'>
      <h4> {props.text_title[props.title]} </h4>
      <p>날짜 : {props.clock[props.title]}</p>
      <p>상세내용</p>
      <button onClick={() => {
        let copyTitle = [...props.text_title]; // array 를 가리키는 주소를 바꿔줌
        copyTitle[0] = '여자 코트 추천';
        props.text_title_change(copyTitle);
      }}>글수정</button>
    </div>
  );
}



export default App;
