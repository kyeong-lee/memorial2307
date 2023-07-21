// 모달 표시/숨기기 함수
function toggleModal() {
  const modal = document.getElementById('modal');
  modal.classList.toggle('show-modal');
}

// 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show-modal');
}

// 추모공간 바로가기 버튼 클릭 시 모달 표시
const tributeButtons = document.querySelectorAll('.tribute-button');

for (const button of tributeButtons) {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // 기본 동작(페이지 이동) 막기
    toggleModal();
  });
}

// 모달 닫기 버튼 클릭 시 모달 닫기
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', () => {
  closeModal();
});

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
};

// 작성완료 버튼 클릭 시 실행되는 함수
document.getElementById('submit-button').addEventListener('click', function (event) {
  // 작성한 내용과 이름 가져오기
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  // 리본 버튼 생성
  createRandomRibbonButton(name, message);

  // 추모글 정보를 localStorage에 저장
  addTributeInfo(name, message);

  // 모달 창 닫기
  closeModal();
});

// localStorage에 새로운 값을 추가하는 함수
function addTributeInfo(name, message) {
  const tributeData = JSON.parse(localStorage.getItem('tributeData')) || [];

  // 새로운 추모글 정보를 배열에 추가
  tributeData.push({ name, message });

  // 배열을 다시 문자열로 변환하여 localStorage에 저장
  localStorage.setItem('tributeData', JSON.stringify(tributeData));
}

const heroSectionRect = document.querySelector('.hero-section').getBoundingClientRect();
const treeSectionRect = document.querySelector('.tree-section').getBoundingClientRect();

// 리본 버튼 생성 함수
function createRandomRibbonButton(name, message) {
  const ribbonSize = 50; // 리본 버튼의 크기 (너비와 높이 동일)

  const treeImage = document.querySelector('.tree-image img');
  const treeImageWidth = parseFloat(getComputedStyle(treeImage).width);
  const treeImageHeight = parseFloat(getComputedStyle(treeImage).height);

  let ribbonLeft = Math.floor(Math.random() * (treeImageWidth - ribbonSize));
  let ribbonTop = Math.floor(Math.random() * (treeImageHeight - ribbonSize));

  // 히어로 섹션에 랜덤한 좌표가 잡힐 경우 다시 좌표를 잡도록 조정
  while (
    (ribbonLeft + ribbonSize) > heroSectionRect.left &&
    ribbonLeft < heroSectionRect.right &&
    (ribbonTop + ribbonSize) > heroSectionRect.top &&
    ribbonTop < heroSectionRect.bottom
  ) {
    ribbonLeft = Math.floor(Math.random() * (treeImageWidth - ribbonSize));
    ribbonTop = Math.floor(Math.random() * (treeImageHeight - ribbonSize));
  }

  // 리본 버튼 생성
  const ribbonButton = document.createElement('button');
  ribbonButton.className = 'ribbon-button';
  ribbonButton.style.position = 'absolute';
  ribbonButton.style.left = `${ribbonLeft}px`;
  ribbonButton.style.top = `${ribbonTop}px`;
  document.body.appendChild(ribbonButton);

  // 리본 이미지를 img 태그로 생성하여 리본 버튼에 삽입
  const ribbonImage = document.createElement('img');
  ribbonImage.src = './images/ribbon.png';
  ribbonImage.alt = '리본 이미지';
  ribbonButton.appendChild(ribbonImage);

  // 리본 버튼에 툴팁을 추가
  ribbonButton.setAttribute('title', message);

  // 리본 버튼의 위치 정보를 JSON 형식으로 저장
  const ribbonInfo = { name, message, position: { left: ribbonLeft, top: ribbonTop } };
  localStorage.setItem(`ribbon_${name}`, JSON.stringify(ribbonInfo));
}

// 페이지 로드 시 로컬 스토리지에서 리본 정보를 불러와 리본 버튼 생성
window.onload = function () {
  const tributeData = JSON.parse(localStorage.getItem('tributeData')) || [];

  for (const tribute of tributeData) {
    const name = tribute.name;
    const message = tribute.message;
    const ribbonInfo = JSON.parse(localStorage.getItem(`ribbon_${name}`));

    if (ribbonInfo) {
      // 저장된 위치 정보를 이용하여 리본 버튼 생성
      const ribbonButton = document.createElement('button');
      ribbonButton.className = 'ribbon-button';
      ribbonButton.style.position = 'absolute';
      ribbonButton.style.left = `${ribbonInfo.position.left}px`;
      ribbonButton.style.top = `${ribbonInfo.position.top}px`;
      document.body.appendChild(ribbonButton);

      // 리본 이미지를 img 태그로 생성하여 리본 버튼에 삽입
      const ribbonImage = document.createElement('img');
      ribbonImage.src = './images/ribbon.png';
      ribbonImage.alt = '리본 이미지';
      ribbonButton.appendChild(ribbonImage);

      // 리본 버튼에 툴팁을 추가
      ribbonButton.setAttribute('title', message);
    }
  }
}
