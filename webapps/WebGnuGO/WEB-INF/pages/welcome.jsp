<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@ page session="false" %> --%>
<html>
<jsp:include page="header.jsp" />
<body>
	<h1 class="title">Welcome to WebGnuGO</h1>

	<br>
	<!-- 	<a href="game/create/9">Create game 9x9</a> -->
	<!-- 	<a href="#">Create game 13x13</a> -->
	<!-- 	<a href="#">Create game 19x19</a> -->

	<div id="menu">
		<div class="option" boardsize="small">
			<div class="title">9x9</div>
		</div>
		<div class="option" boardsize="medium">
			<div class="title">13x13</div>
		</div>
		<div class="option" boardsize="big">
			<div class="title">19x19</div>
		</div>
	</div>
	<div class="footer">
		This is just a simple web interface for <a href="http://www.gnu.org/software/gnugo/">GnuGO</a> application.
	</div>
</body>
</html>