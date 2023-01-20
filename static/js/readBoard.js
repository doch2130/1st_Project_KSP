window.addEventListener('DOMContentLoaded', event => {

    // 답글 펼치기 기능을 위한 각 클래스 부여 작업
    const commentViewList = document.getElementById('commentViewList');
    const commentViewRows = commentViewList.getElementsByClassName('row');

    let temp = '';
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
    // console.log(boardnumber);
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
            // console.log(response);
            const { id, content, writetime, number } = response.data.comment;
            const writetimeDate = new Date(writetime);

            const commentViewList = document.getElementById('commentViewList');
            const div = document.createElement('div');
            div.className += 'row';

            let temp = `<div class="col-11">
            <p style="display: none">${number}</p>
            <p>${id}</p>
            <pre>${content}</pre>
            <p>${writetimeDate.toLocaleDateString()}
            <span style="display: none">(수정됨)</span>
            <span class="nestedCommentBtn" onclick="nestedCommentBtn(this)">답글</span>
            </p>
            <div class="col-11" style="display: none;">
            <div class="nestedCommentDiv">
            <form>
            <textarea name="comment"></textarea>
            <br />
            <button type="button" class="btn btn-outline-secondary" onclick="nestedCommentWrite(this, '${boardNumber}', '${status}', '${response.data.commentList.length}')">등록</button>
            <button type="button" class="btn btn-outline-secondary" onclick="nestedCommentCancel(this)">취소</button>
            </form>
            </div>
            </div>
            </div>
            <div class="col-1">
            <div class="btn-group dropstart">
            <button type="button" class="btn btn-secondary dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">:</button>
            <ul class="dropdown-menu">
            <p onclick="commentEdit(this, '${content}')">수정</p>
            <p onclick="commentDelete(this, '${number}', '${boardNumber}')">삭제</p>
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
            <div class="col-12">
            </div>
            `;

            div.innerHTML = temp;
            commentViewList.prepend(div);
            form.comment.value = '';
            form.comment.focus();

            // 총 댓글 개수 반영
            // console.log(document.getElementById('totalCommentCount').textContent.slice(3, -1));
            const totalCommentCount = Number(document.getElementById('totalCommentCount').textContent.slice(3, -1)) + 1;
            document.getElementById('totalCommentCount').textContent = `댓글 ${totalCommentCount}개`;
        });
    }
}

// 댓글 삭제
function commentDelete(e, commentNumber, boardNumber) {
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
                commentNumber: commentNumber,
                boardNumber: boardNumber
            }
        })
        .then((response) => {
            commentParent.remove();
            // col1.remove();
            // alert('삭제하였습니다.');

            // 총 댓글 개수 반영
            // 댓글을 삭제할 때 답글이 있는 경우 -1만 하면 답글 삭제 개수는 반영이 안되서
            // DB에서 개수 조회 후 더하는 방식으로 변경
            const totalCommentCount = response.data.nestedCommentList.length + response.data.commentList.length;
            document.getElementById('totalCommentCount').textContent = `댓글 ${totalCommentCount}개`;

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
function nestedCommentWrite(e, boardNumber, status, commentNumber) {
    const nestedCommentDiv = e.parentElement.parentElement.parentElement;
    if (status != "true") {
        alert("로그인 후 작성이 가능합니다.");
        nestedCommentDiv.style.display = 'none';
        
        const commentChooseMsg = confirm('로그인 페이지로 이동하시겠습니까?');
        if(commentChooseMsg) {
            document.location.href='/login';
        }
        return false;
    }

    
    const nestedForm = e.parentElement;
    const commentNumValue = nestedCommentDiv.parentElement.children[0].textContent;

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
                commentNumber: commentNumValue,
                nestedComment: nestedForm.comment.value
            }
        })
        .then((response) => {
            // console.log(response);
            const { id, content, writetime, number } = response.data.create;
            // console.log(id, content, writetime, number);
            const writetimeDate = new Date(writetime);
            // alert('등록완료');
            nestedForm.comment.value = '';
            nestedCommentDiv.style.display = 'none';
            // nestedCommentDiv.focus();

            // col12
            const nestedCommentListDiv = nestedCommentDiv.parentElement.parentElement.children[3];

            const div = document.createElement('div');
            div.className += 'row';

            let temp = '';
            if(response.data.list.length === 1) {
                temp = `<button class="btn btn-secondary collapse-btn 'collapse-btn${commentNumber}'" 
            type="button" data-bs-toggle="collapse" data-bs-target="#collapseComment${Number(commentNumber)+10}" 
            aria-expanded="true" aria-controls="collapseExample">답글 ${response.data.list.length}개</button>
            `;
            nestedCommentListDiv.innerHTML = temp;
            }
            
            temp = `<div class="col-11 collapse show" id="collapseComment${Number(commentNumber)+10}">
            <div class="card card-body">
            <p>${id}</p>
            <pre>${content}</pre>
            <p>${writetimeDate.toLocaleDateString()}</p>
            </div>
            </div>
            <div class="col-1 collapse show" id="collapseComment${Number(commentNumber)+10}">
            <div class="btn-group dropstart">
            <button type="button" class="btn btn-secondary dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">:</button>
            <ul class="dropdown-menu">
            <p onclick="nestedCommentEdit(this, '${content}')">수정</p>
            <p onclick="nestedCommentDelete(this, '${number}')">삭제</p>
            </ul>
            </div>
            </div>
            <div class="col-12" style="display: none;">
            <div id="nestedCommentWriteUpdate">
            <form id="nestedCommentWriteUpdateForm" class="nestedCommentWriteUpdateForm">
            <textarea name="comment"></textarea>
            <br />
            <button type="button" class="btn btn-outline-secondary" onclick="nestedCommentEditUpdate(this, '${number}')">등록</button>
            <button type="button" class="btn btn-outline-secondary" onclick="nestedCommentEditCancel(this)">취소</button>
            </form>
            </div>
            </div>`;
            // console.log(nestedCommentListDiv);
            // console.log(nestedCommentListDiv.children[0]);

            div.innerHTML = temp;
            nestedCommentListDiv.children[0].after(div);
            nestedCommentListDiv.children[0].textContent = '답글 ' + response.data.list.length + '개';
            // nestedCommentListDiv.appendTo(div);
            // commentViewList.prepend(div);


            // 총 댓글 개수 반영
            // console.log(document.getElementById('totalCommentCount').textContent.slice(3, -1));
            const totalCommentCount = Number(document.getElementById('totalCommentCount').textContent.slice(3, -1)) + 1;
            document.getElementById('totalCommentCount').textContent = `댓글 ${totalCommentCount}개`;
        });
    }
}



// 대댓글 답글 삭제
function nestedCommentDelete(e, nestedCommentNumber) {
    // console.log(nestedCommentNumber);
    // console.log(e.parentElement.parentElement.parentElement);
    // console.log(e.parentElement.parentElement.parentElement.parentElement);
    // console.log(e.parentElement.parentElement.parentElement.previousElementSibling);

    let chooseMsg;
    chooseMsg = confirm('댓글을 삭제하시겠습니까?');

    if(chooseMsg) {
        const nestedCommentBtn = e.parentElement.parentElement.parentElement.parentElement.parentElement.children[0];
        const nestedCommentParent = e.parentElement.parentElement.parentElement.parentElement;
        // console.log(nestedCommentBtn);
        // console.log(nestedCommentParent);
        // console.log(nestedCommentBtn.textContent);
        // console.log(nestedCommentBtn.textContent.slice(3, -1));
        // console.log(typeof(nestedCommentBtn.textContent.slice(3, -1)));
        // // string
        // console.log(Number(nestedCommentBtn.textContent.slice(3, -1))-1);

        axios({
            method: 'post',
            url: '/board/comment/nestedcomment/delete',
            data: {
                nestedCommentNumber: nestedCommentNumber
            }
        })
        .then(() => {
            nestedCommentParent.remove();
            const nestedCommentBtnNum = Number(nestedCommentBtn.textContent.slice(3, -1))-1;
            if(nestedCommentBtnNum === 0) {
                nestedCommentBtn.remove();
            } else {
                nestedCommentBtn.textContent = '답글 ' + nestedCommentBtnNum + '개'
            }

            // 총 댓글 개수 반영
            // console.log(document.getElementById('totalCommentCount').textContent.slice(3, -1));
            const totalCommentCount = Number(document.getElementById('totalCommentCount').textContent.slice(3, -1)) - 1;
            document.getElementById('totalCommentCount').textContent = `댓글 ${totalCommentCount}개`;
        });
    }
}

// 대댓글 및 답글 수정 입력 창 표시
function nestedCommentEdit(e, nestedCommentContent) {
    const col1 = e.parentElement.parentElement.parentElement;
    const col11 = col1.previousElementSibling;
    const nestedCommentWriteUpdateParent = e.parentElement.parentElement.parentElement.nextElementSibling;
    // console.log(nestedCommentWriteUpdateParent);

    nestedCommentWriteUpdateParent.children[0].children[0].comment.textContent = nestedCommentContent;

    nestedCommentWriteUpdateParent.style.display = 'block';
    col1.style.display = 'none';
    col11.style.display = 'none';
}

// 대댓글 및 답글 수정 취소
function nestedCommentEditCancel(e) {
    const col12 = e.parentElement.parentElement.parentElement;
    const col1 = e.parentElement.parentElement.parentElement.previousElementSibling;
    const col11 = e.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;
    col12.style.display = 'none';
    col1.style.display = 'block';
    col11.style.display = 'block';
}


// 대댓글 및 답글 수정 등록
function nestedCommentEditUpdate(e, nestedCommentNumber) {
    const nestedCommentWriteUpdateForm = e.parentElement;

    if(nestedCommentWriteUpdateForm.comment.value === '') {
        alert('내용을 입력해주세요.');
        return false;
    }
    let chooseMsg;
    chooseMsg = confirm('수정한 내용으로 등록하시겠습니까?');
    
    if (chooseMsg) {
        axios({
            method: 'post',
            url: '/board/comment/nestedcomment/update',
            data: {
                nestedCommentNumber: nestedCommentNumber,
                nestedCommentContent: nestedCommentWriteUpdateForm.comment.value
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
            col11.children[0].children[1].textContent = nestedCommentWriteUpdateForm.comment.value;
            col11.children[0].children[2].children[0].style.display = 'inline';
        });
    }
}