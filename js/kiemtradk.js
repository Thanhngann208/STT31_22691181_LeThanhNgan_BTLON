$(document).ready(function() {


    // kiểm tra thong tin đăng ký
    $('#registrationForm').submit(function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        var usernameError = $('#usernameError');
        var emailError = $('#emailError');
        var phoneError = $('#phoneError');
        var passwordError = $('#passwordError');
        var confirmPasswordError = $('#confirmPasswordError');

        usernameError.text('');
        emailError.text('');
        phoneError.text('');
        passwordError.text('');
        confirmPasswordError.text('');

        if (username.length < 6) {
            event.preventDefault();
            usernameError.text('Tên tài khoản phải có ít nhất 6 ký tự.');
        }

        if (!email.trim() || !isValidEmail(email)) {
            event.preventDefault();
            emailError.text('Vui lòng nhập địa chỉ email hợp lệ.');
        }

        if (!isValidPhoneNumber(phone)) {
            event.preventDefault();
            phoneError.text('Vui lòng nhập số điện thoại hợp lệ.');
        }

        if (password.length < 8) {
            event.preventDefault();
            passwordError.text('Mật khẩu phải có ít nhất 8 ký tự.');
        } else if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            event.preventDefault();
            passwordError.text('Mật khẩu phải chứa ít nhất một ký tự in hoa, một số và một ký tự đặc biệt.');
        }

        if (password !== confirmPassword) {
            event.preventDefault();
            confirmPasswordError.text('Mật khẩu xác nhận không khớp.');
        }

        if (username.length >= 6 && isValidEmail(email) && isValidPhoneNumber(phone) && password === confirmPassword) {
            // Lưu vào Local Storage
            saveToLocalStorage(username, email, phone, password);
            alert('Đăng ký thành công và thông tin đã được lưu!');
            window.location.href = '../../html/home.html';

        }

        

    });

    function isValidEmail(email) {
        // Kiểm tra địa chỉ email hợp lệ
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhoneNumber(phone) {
        // Kiểm tra số điện thoại hợp lệ 
        var phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    //ket thuc

    function saveToLocalStorage(username, email, phone, password) {
        var userAccount = {
            username: username,
            email: email,
            phone: phone,
            password: password // Chỉ dùng cho demo, không nên lưu mật khẩu như thế này trong thực tế!
        };

        localStorage.setItem('userAccount', JSON.stringify(userAccount));
    }


    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Ngăn chặn form submit

        var username = $('#username').val();
        var password = $('#password').val();
        var loginError = $('#loginError');

        // Xóa thông báo lỗi trước đó (nếu có)
        loginError.text('');

        // Lấy thông tin tài khoản từ Local Storage
        var savedAccount = localStorage.getItem('userAccount');

        if (savedAccount) {
            savedAccount = JSON.parse(savedAccount);

        // Kiểm tra thông tin đăng nhập
            if (username === savedAccount.username && password === savedAccount.password) {
                // Đăng nhập thành công
                alert('Đăng nhập thành công!');
                window.location.href = '../../html/home.html'; // Chuyển hướng về trang chủ
            } else {
                // Thông tin không khớp
                loginError.text('Tài khoản hoặc mật khẩu không đúng.');
            }
        } else {
            loginError.text('Tài khoản không tồn tại. Vui lòng đăng ký trước.');
        }
    });
});