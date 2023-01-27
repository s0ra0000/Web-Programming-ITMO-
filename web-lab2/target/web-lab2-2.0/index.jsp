<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="entries" class="beans.EntriesBean" scope="session" />

<%@ page import="beans.EntriesBean" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"
            integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
            crossorigin="anonymous"></script>
    <script src='https://cdn.jsdelivr.net/npm/big.js@6.2.1/big.min.js'></script>
    <title>web-lab2-2.0</title>
</head>
<body>
<div class="container">
    <div class="content">
        <div class="bg-opacity"></div>
        <div class="header">
            <p>Лабораторная работа №2</p>
        </div>
        <div class="section-left">
            <p>Привет!</p>
            <span>Алуко Кехинде Джеймс</span>
            <p>P32301</p>
            <a href="google.mn"><button type="button" class="git-btn">Github</button></a>
        </div>
        <div class="section-right">
            <img src="img/coding.png"/>
        </div>
    </div>
    <div class="main">
        <p>Вариант: 321887</p>
        <div class="graph">
            <img id="graph-bg" src="img/graph-bg.png" alt="graph">
            <object id="graph" data="img/graph.svg">
            </object>
            <canvas id="myGraph" height="300px" width="300px"></canvas>
            <canvas id="savedPoint" height="300px" width="300px"></canvas>
            <canvas id="point" height="300px" width="300px"></canvas>
        </div>
        <form id="submit-form">
            <div class="x-values">
                <label class="value-header">X-value:
                </label><br>
                <div class="labels">
                    <hr>
                    <label class="label">
                        <input type="radio" class="x-value" value="-3" name="xVal" />
                        <p class="values">-3</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="x-value" value="-2" name="xVal" />
                        <p class="values">-2</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="x-value" value="-1" name="xVal" />
                        <p class="values">-1</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="x-value" value="0" name="xVal" />
                        <p class="values">0</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="x-value" value="1" name="xVal" />
                        <p class="values">1</p>
                    </label >

                    <label class="label">
                        <input type="radio" class="x-value" value="2" name="xVal" />
                        <p class="values">2</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="x-value" value="3" name="xVal" />
                        <p class="values">3</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="x-value" value="4" name="xVal" />
                        <p class="values">4</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="x-value" value="5" name="xVal" />
                        <p class="values">5</p>
                    </label>
                </div>
            </div>
            <div class="y-values">
                <label for="y-value" class="value-header">Y value:</label>
                <input type="text" name="yVal" id="y-value" placeholder="{-5 ... 5}"/>
            </div>
            <div class="r-values">
                <label class="value-header">R value:</label><br>
                <div class="labels">
                    <hr>
                    <label class="label">
                        <input type="radio" class="r-value" value="1" name="rVal" />
                        <p class="values">1</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="r-value" value="2" name="rVal" />
                        <p class="values">2</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="r-value" value="3" name="rVal" />
                        <p class="values">3</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="r-value" value="4" name="rVal" />
                        <p class="values">4</p>
                    </label>

                    <label class="label">
                        <input type="radio" class="r-value" value="5" name="rVal" />
                        <p class="values">5</p>
                    </label>
                </div>

            </div>

            <div class="check-button">
                <span class="error">Invalid input</span>
                <input id="submit" type="submit" class="check_button"/>
            </div>
        </form>
    </div>
    <div class="result">

        <div class="table">
            <div>
                <h3 id="result-h3">Результат </h3>
            </div>
            <div class="table-items">
                <table id="result-table">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Date</th>
                        <th>Runtime</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody id="table-body">
                    <%
                        if(!EntriesBean.entries.isEmpty()){
                            for (int i = EntriesBean.entries.size()-1; i>=0; i--){
                                out.println("<tr id='beans'>");
                                out.println("<td id='x'>"+EntriesBean.entries.get(i).getxValue()+"</td>");
                                out.println("<td id='y'>"+EntriesBean.entries.get(i).getyValue()+"</td>");
                                out.println("<td id='z'>"+EntriesBean.entries.get(i).getrValue()+"</td>");
                                out.println("<td>"+EntriesBean.entries.get(i).getCurrentTime()+"</td>");
                                out.println("<td>"+EntriesBean.entries.get(i).getExecutionTime()+"</td>");
                                out.println("<td>"+EntriesBean.entries.get(i).isHitResult()+"</td>");
                                out.println("</tr>");
                            }
                        }
                    %>
                    </tbody>
                </table>
            </div>
            <button id="clear-btn" value="true">Clear</button>
        </div>

    </div>
</div>
<footer>
    &#169 2022 ITMO University
</footer>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>