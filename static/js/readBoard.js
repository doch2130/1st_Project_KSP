window.addEventListener('DOMContentLoaded', event => {

    // 답글 펼치기
    const commentViewList = document.getElementById('commentViewList');
    const commentViewRows = commentViewList.getElementsByClassName('row');
    // console.log(commentViewRows);
    // const collapseBtn = commentViewList.getElementsByClassName('collapse-btn');
    // const collapse = commentViewList.getElementsByClassName('collapse');
    // // console.log(collapse);

    // let temp = '';
    // let tempid = '';
    // for (let i = 0; i < collapseBtn.length; i++) {
    //     temp = '#collapseComment' + (i + 10);
    //     tempid = 'collapseComment' + (i + 10);
    //     collapseBtn[i].setAttribute('data-bs-target', temp);
    //     collapse[i].id = tempid;
    // }

    let temp = '';
    let collapseList = commentViewList.getElementsByClassName('collapse-btn');
    // console.log(collapseList.length);
    let collapseBtn;
    for (let i = 0; i < commentViewRows.length; i++) {
        temp = 'collapse-btn' + i;
        // console.log(temp);
        collapseBtn = commentViewList.getElementsByClassName(temp);
        // console.log(collapseBtn);
        if(collapseBtn.length > 0) {
            collapseBtn[0].textContent = '답글 ' + collapseBtn.length + '개';
        }
        if(collapseBtn.length > 1) {
            for (let j = collapseBtn.length; j > 1; j--) {
                // console.log(collapseBtn[j-1]);
                collapseBtn[j-1].remove();
                // i--;
            }
        }
    }
});

// 게시글 삭제
function delete_Board(boardnumber, status) {
    console.log(boardnumber);
    let user = {
        number: boardnumber
    };
    
    if ( !"<%=result.isLogin%>" ) {
        alert( "로그인 하십시오" ); 
        document.location.href='/login';
    }
    let chooseMsg;
    chooseMsg = confirm('게시글을 삭제하시겠습니까?');
    if(chooseMsg) {
        axios({
            method: 'delete',
            url: '/board/delete',
            data: user
        })
        .then((rep) => {
            return rep.data;
        })
        .then((data) => {
            if( data ) {
                alert( "게시글 삭제가 완료되었습니다." );
                document.location.href='/board';
            } else {
                alert( "알 수 없는 문제가 발생했습니다." );
            }
        });
    }
}

// 댓글 작성
function commentWrite(boardNumber, status) {
    if (status != "true") {
        alert("로그인 후 작성이 가능합니다.");
        document.location.href='/login';
        return false;
    }

    const form = document.getElementById('commentWriteForm');
    if(form.comment.value === '') {
        alert('댓글을 입력해주세요.');
        return false;
    }

    let chooseMsg;
    chooseMsg = confirm('댓글을 등록하시겠습니까?');

    if(chooseMsg) {
        axios({
            method: 'post',
            url: '/board/comment/write',
            data: {
                boardNumber: boardNumber,
                content: form.comment.value
            }
        })
        .then((response) => {
            console.log(response);
            const { id, content, writetime, number, updateflag } = response.data;
            const writetimeDate = new Date(writetime);

            const commentViewList = document.getElementById('commentViewList');
            const div = document.createElement('div');
            div.className += 'row';

            let temp = `<div class="col-11">
            <p style="display: none">${number}</p>
            <p>${id}</p>
            <p>${content}</p>
            <p>${writetimeDate.toLocaleDateString()}
            <span style="display: none">(수정됨)</span>
            <span>답글</span>
            </p>
            </div>
            <div class="col-1">
            <div class="btn-group dropstart">
            <button type="button" class="btn btn-secondary dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">:</button>
            <ul class="dropdown-menu">
            <p onclick="commentEdit(this, '${content}')">수정</p>
            <p onclick="commentDelete(this, '${number}')">삭제</p>
            </ul>
            </div>
            </div>
            <div class="col-12" style="display: none;">
            <div id="commentWriteUpdate">
            <form id="commentWriteUpdateForm">
            <textarea name="comment"></textarea>
            <br />
            <button type="button" class="btn btn-outline-secondary" onclick="commentEditUpdate(this, '${number}')">등록</button>
            <button type="button" class="btn btn-outline-secondary" onclick="commentEditCancel(this)">취소</button>
            </form>
            </div>
            </div>
            `;

            div.innerHTML = temp;
            commentViewList.prepend(div);
            form.comment.value = '';
            form.comment.focus();
        });
    }
}

// 댓글 삭제
function commentDelete(e, commentNumber) {
    // console.log(commentnumber);
    // console.log(e.parentElement.parentElement.parentElement);
    // console.log(e.parentElement.parentElement.parentElement.parentElement);
    // console.log(e.parentElement.parentElement.parentElement.previousElementSibling);

    let chooseMsg;
    chooseMsg = confirm('댓글을 삭제하시겠습니까?');

    if(chooseMsg) {
        // const col11 = e.parentElement.parentElement.parentElement.previousElementSibling;
        const commentParent = e.parentElement.parentElement.parentElement.parentElement;

        axios({
            method: 'post',
            url: '/board/comment/delete',
            data: {
                commentNumber: commentNumber
            }
        })
        .then(() => {
            commentParent.remove();
            // col1.remove();
            alert('삭제하였습니다.');
        });
    }
}

// 댓글 수정
function commentEdit(e, commentContent) {
    // console.log(e);
    const col1 = e.parentElement.parentElement.parentElement;
    const col11 = col1.previousElementSibling;
    const commentWriteUpdateParent = e.parentElement.parentElement.parentElement.nextElementSibling;

    // console.log(commentWriteUpdateParent.children[0].children[0]);
    // console.log(commentWriteUpdateParent.children[0].children[0].comment);
    commentWriteUpdateParent.children[0].children[0].comment.textContent = commentContent;
    
    commentWriteUpdateParent.style.display = 'block';
    col1.style.display = 'none';
    col11.style.display = 'none';
}

// 댓글 수정 취소
function commentEditCancel(e) {
    // console.log(e.parentElement.parentElement.parentElement);
    // console.log(e.parentElement.parentElement.parentElement.previousElementSibling);
    // console.log(e.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling);
    const col12 = e.parentElement.parentElement.parentElement;
    const col1 = e.parentElement.parentElement.parentElement.previousElementSibling;
    const col11 = e.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;
    col12.style.display = 'none';
    col1.style.display = 'block';
    col11.style.display = 'block';
}

// 댓글 수정 등록
function commentEditUpdate(e, commentNumber) {
    let chooseMsg;
    chooseMsg = confirm('수정한 내용으로 등록하시겠습니까?');
    
    // console.log(e.parentElement);

    if (chooseMsg) {
        const commentWriteUpdateForm = e.parentElement;

        axios({
            method: 'post',
            url: '/board/comment/update',
            data: {
                commentNumber: commentNumber,
                commentContent: commentWriteUpdateForm.comment.value
            }
        })
        .then(() => {
            const col12 = e.parentElement.parentElement.parentElement;
            const col1 = e.parentElement.parentElement.parentElement.previousElementSibling;
            const col11 = e.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;
            col12.style.display = 'none';
            col1.style.display = 'block';
            col11.style.display = 'block';
            // console.log(col11.children[1]);
            col11.children[2].textContent = commentWriteUpdateForm.comment.value;
            col11.children[3].children[0].style.display = 'inline';
        });
    }
}

// 답글 입력 창 표시
function nestedCommentBtn(e) {
    const nestedCommentDiv = e.parentElement.nextElementSibling;
    nestedCommentDiv.style.display = 'block';
    nestedCommentDiv.children[0].children[0].children[0].focus();
}

// 답글 등록 취소
function nestedCommentCancel(e) {
    const nestedCommentDiv = e.parentElement.parentElement.parentElement;
    nestedCommentDiv.style.display = 'none';
}

// 답글 등록
function nestedCommentWrite(e, boardNumber, status) {
    const nestedCommentDiv = e.parentElement.parentElement.parentElement;
    if (status != "true") {
        alert("로그인 후 작성이 가능합니다.");
        // document.location.href='/login';
        nestedCommentDiv.style.display = 'none';
        return false;
    }

    
    const nestedForm = e.parentElement;
    const commentNumber = nestedCommentDiv.parentElement.children[0].textContent;
    // console.log(commentNumber);
    // console.log(commentNumber.textContent);

    if(nestedForm.comment.value === '') {
        alert('내용을 입력해주세요.');
        nestedForm.comment.focus();
        return false;
    }

    let chooseMsg;
    chooseMsg = confirm('댓글을 등록하시겠습니까?');

    if (chooseMsg) {
        axios({
            method: 'post',
            url: '/board/comment/nestedcomment/write',
            data: {
                boardNumber: boardNumber,
                commentNumber: commentNumber,
                nestedComment: nestedForm.comment.value
            }
        })
        .then((response) => {
            console.log(response);
            // alert('등록완료');
            nestedForm.comment.value = '';
            nestedCommentDiv.style.display = 'none';
            nestedCommentDiv.focus();
        });
    }
}

