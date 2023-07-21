window.onload = function () {
    // 댓글 영역 요소
    const commentsList = document.getElementById('comments-list');
  
    // localStorage에서 모든 댓글 정보 가져오기
    const allComments = JSON.parse(localStorage.getItem('allComments')) || [];
  
    // 가져온 모든 댓글을 댓글 영역에 표시
    allComments.forEach(({ name, message }) => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
  
      const nameElem = document.createElement('strong');
      nameElem.textContent = name;
      commentDiv.appendChild(nameElem);
  
      const messageElem = document.createElement('p');
      messageElem.textContent = message;
      commentDiv.appendChild(messageElem);
  
      commentsList.appendChild(commentDiv);
    });
  };
  

  function displayAllTributes() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; // 기존의 내용을 초기화
  
    // localStorage에서 데이터를 읽어와서 화면에 표시
    const tributeData = JSON.parse(localStorage.getItem('tributeData')) || [];
    tributeData.forEach(({ name, message }) => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      const nameElem = document.createElement('strong');
      nameElem.textContent = name;
      commentDiv.appendChild(nameElem);
      const messageElem = document.createElement('p');
      messageElem.textContent = message;
      commentDiv.appendChild(messageElem);
  
      commentsList.appendChild(commentDiv);
    });
  }
  
  // DOMContentLoaded 이벤트 리스너에 displayAllTributes 함수를 등록하여 페이지 로드 시 데이터 표시
  document.addEventListener('DOMContentLoaded', displayAllTributes);