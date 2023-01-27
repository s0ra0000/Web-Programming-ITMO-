package servlets;

import beans.EntriesBean;
import beans.Entry;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@WebServlet(name = "AreaCheckerServlet" ,urlPatterns = "/checker")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
         if (request.getParameter("xVal") != null && request.getParameter("yVal") != null
                && request.getParameter("rVal") != null) {
             long startTime = System.nanoTime();
             String xString = request.getParameter("xVal");
             String yString = request.getParameter("yVal").replace(',', '.');
             String rString = request.getParameter("rVal");
             boolean isValuesValid = validateValues(xString, yString, rString);

             if (isValuesValid) {
                 double xValue = Double.parseDouble(xString);
                 double yValue = Double.parseDouble(yString);
                 double rValue = Double.parseDouble(rString);

                 boolean isHit = checkHit(xValue, yValue, rValue);

                 OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
                 String currentTime;
                 try {
                     currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(request.getParameter("timezone")));
                     currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
                 } catch (Exception e) {
                     currentTime = "HH:mm:ss";
                 }

                 String executionTime = String.valueOf(System.nanoTime() - startTime);

                 EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
                 if (entries == null) {
                     entries = new EntriesBean();
                 }
                 entries.getEntries().add(new Entry(xValue, yValue, rValue, currentTime, executionTime, isHit));
                 request.getSession().setAttribute("entries", entries);
                 getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
//            response.sendRedirect("/index.jsp");
             }
         }
         else {
                 getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
//            response.sendRedirect("/index.jsp");
             }
//
    }

    private boolean validateX(String xString){
        try {
            Double[] xRange = {-3.0,-2.0,-1.0,0.0,1.0,2.0,3.0,4.0,5.0};
            double xValue = Double.parseDouble(xString);
            return Arrays.asList(xRange).contains(xValue);
        }catch (NumberFormatException e){
            return false;
        }
    }
    private boolean validateY(String yString){
        try{
            double yValue = Double.parseDouble(yString);
            return yValue >= -5 && yValue <=5;
        } catch (NumberFormatException e){
            return false;
        }
    }
    private boolean validateR(String rString){
        try{
            Double[] rRange = {1.0,2.0,3.0,4.0,5.0};
            double rValue = Double.parseDouble(rString);
            return Arrays.asList(rRange).contains(rValue);
        } catch (NumberFormatException e){
            return false;
        }
    }
    private boolean validateValues(String xString, String yString, String rString){
        return validateX(xString) && validateY(yString) && validateR(rString);
    }
    private boolean checkTriangle(double xValue, double yValue, double rValue){
        return xValue >= 0 && yValue >=0 && xValue <= rValue && yValue <= rValue/2.0 && yValue <= (-xValue)/2.0 + rValue/2.0;
    }
    private boolean checkRectangle(double xValue, double yValue, double rValue){
        return xValue <= 0 && yValue <= 0 && xValue >= -rValue / 2.0 && yValue >= -rValue;
    }
    private boolean checkCircle(double xValue, double yValue, double rValue){
        return xValue >= 0 && yValue <= 0 && Math.sqrt(xValue*xValue + yValue*yValue) <= rValue;
    }
    private boolean checkHit(double xString,double yString,double rString){
        return checkRectangle(xString,yString,rString) || checkTriangle(xString,yString,rString) || checkCircle(xString,yString,rString);
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}
