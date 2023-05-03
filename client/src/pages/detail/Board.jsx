import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router";
import axios from "axios";
import bg from "../../assets/body-bg.jpg";
import { ServerApi } from "../../api/ServerApi";

function Board() {
  const [title, setTitle] = useState(""); // 새로운 게시글의 제목을 담는 state
  const [text, setText] = useState(""); // 새로운 게시글을 담는 state
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handlePostChange = (event, editor) => {
    const data = editor.getData();
    setText(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 고유한 게시글 번호 생성 날짜를 기반으로 생성
    const postId = Date.now().toString();

    // API 호출을 통해 새로운 게시글 서버에 전송
    axios
      .post(`${ServerApi}/board/add`, {
        title,
        text,
        postId,
      })
      .then((response) => {
        // API 호출을 통해 게시글 목록 다시 불러오기
        axios.get(`${ServerApi}/board/list`).then((response) => {
          setText(response.data);
          navigate(`${ServerApi}/board/list`); // 글쓰기가 완료되면 게시판 목록 페이지로 이동
        });
      })
      .catch((error) => console.log(error));

    setText(""); // 글쓰기 완료 후 새로운 게시글 내용 초기화
    setTitle(""); // 글쓰기 완료 후 새로운 게시글 제목 초기화
  };

  return (
    <div>
      <div className='page-header' style={{ backgroundImage: `url(${bg})` }}>
        <h2>게시판</h2>
      </div>
      <h3>제목 입력</h3>
      <input
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <h3>내용 작성</h3>
        <input
          type='text'
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit'>글쓰기</button>
      </form>
    </div>
  );
}

export default Board;
