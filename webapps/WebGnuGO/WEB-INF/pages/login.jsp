<html>
<head>
    <title>Login Page</title>
    <style>
        body {
            background-image: url("../img/SOTATSU.jpg");
            -webkit-background-size: cover;
            -background-size: cover;
            -background-size: cover;
            background-size: cover;
        }
        div#login {
            width: 25%;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body onload='document.f.username.focus();'>

<div id="login">
    <h3>Login with Username and Password</h3>
    <form name='f' action='/login' method='POST'>
        <table>
            <tr>
                <td>User:</td>
                <td><input type='text' name='username' value=''></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><input type='password' name='password'/></td>
            </tr>
            <tr>
                <td colspan='2'><input name="submit" type="submit" value="Login"/></td>
            </tr>
        </table>
    </form>
</div>

</body>
</html>
