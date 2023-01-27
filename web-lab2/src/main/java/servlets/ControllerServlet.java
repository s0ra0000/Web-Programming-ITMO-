package servlets;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name="ControllerServlet", urlPatterns="/process")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("clear") != null && request.getParameter("clear").equals("true")){
            getServletContext().getNamedDispatcher("ClearTableServlet").forward(request,response);
        }  else if (request.getParameter("xVal") != null && request.getParameter("yVal") != null
                && request.getParameter("rVal") != null){
            getServletContext().getNamedDispatcher("AreaCheckerServlet").forward(request, response);
//            response.sendRedirect("/index.jsp");
        } else{
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
//            response.sendRedirect("/index.jsp");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}