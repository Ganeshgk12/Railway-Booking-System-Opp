package railwaybookingsystem;

import java.util.Scanner;
import java.util.ArrayList;

public class Admin {

     int tottalBerths = 3;
     int lowerBerths = 1;
     int middleBerths = 1;
     int upperBerths = 1;

     int tottalRACBerths = 1;
     int tottalWaitingListTickets = 1;

    private ArrayList<Passanger> bookedTickets = new ArrayList<>();
    private ArrayList<Passanger> racTickets = new ArrayList<>();
    private ArrayList<Passanger> waitingListTickets = new ArrayList<>();

     public void ticketBooking(){
         Scanner sc = new Scanner(System.in);

         if(tottalWaitingListTickets == 0){
             System.out.println("-----NO TICKETS AVAILABLE-----");
             System.out.println("------------------------------");
         }

         System.out.println("Enter Passanger name");
         String name = sc.nextLine();
         System.out.println("Enter Passanger age");
         int age = sc.nextInt();
         sc.nextLine();
         System.out.println("Enter Passanger gender");
         String gender = sc.nextLine().toUpperCase();
         System.out.println("Enter berth preference -- Lower / Middle / Upper");
         String berthpreference = sc.nextLine().toLowerCase();

         if(berthpreference.equals("lower")){
             if(lowerBerths > 0){
                 lowerBerths--;
             }else {
                 System.out.println("----------------------------------------");
                 System.out.println("----Lower berths are not Available -- Suggesting available berths -----");
                 suggestAvailableBerths(name, age, gender);
                 return;
             }
         } else if (berthpreference.equals("middle")) {
             if(middleBerths > 0){
                 middleBerths--;
             }else{
                 System.out.println("-----------------------------------------");
                 System.out.println("----- Middle berths are not Available --- Suggesting available berths----");
                 suggestAvailableBerths(name,age,gender);
                 return;
             }

         } else if (berthpreference.equals("upper")) {
             if (upperBerths > 0){
                 upperBerths--;
             }else {
                 System.out.println("-------------------------------------------");
                 System.out.println("----- Upper berths are not Available--- Suggesting available berths");
                 suggestAvailableBerths(name,age,gender);
                 return;
             }
         }else {
             System.out.println("---------------");
             System.out.println("Invalid Input");
         }

         if(age > 5){

             Passanger passanger = new Passanger(name,age,gender,berthpreference);

             if(tottalBerths > 0){
                 tottalBerths--;
                 bookedTickets.add(passanger);
                 System.out.println("----- ! Ticket booked successfully----");
             } else if (tottalRACBerths > 0) {
                 tottalRACBerths--;
                 bookedTickets.add(passanger);
                 System.out.println("------ ! RAC Ticket booked sucessfully----");
             } else if (tottalWaitingListTickets > 0) {
                 tottalWaitingListTickets--;
                 bookedTickets.add(passanger);
                 System.out.println("------ ! Waitinglist Ticket booked sucessfully----");
             }
         }

     }

     public void suggestAvailableBerths(String name,int age,String gender){

         System.out.println("-----------------------");
         if(lowerBerths > 0){
             System.out.println("1. Lower ");
         }
         if(middleBerths > 0){
             System.out.println("2. Middle ");
         }
         if(upperBerths > 0){
             System.out.println("3. Upper ");
         }
         if(lowerBerths == 0 && middleBerths == 0 && upperBerths == 0){
             System.out.println("4. Book on RAC ");
         }

         System.out.println("--Hurry..... Few tickets are Avail ");

         System.out.println("Enter your choice booking available tickets ");
         Scanner sc = new Scanner(System.in);
         int choice = sc.nextInt();
         sc.nextLine();

         switch (choice){
             case 1:
                 lowerBerths--;
                 bookedTickets.add(new Passanger(name,age,gender,"lower"));
                 tottalBerths--;
                 System.out.println("--------------------------");
                 System.out.println("Ticket booked successfully (lower)-----");
                 break;

             case 2:
                 middleBerths--;
                 bookedTickets.add(new Passanger(name,age,gender,"middle"));
                 tottalBerths--;
                 System.out.println("--------------------------");
                 System.out.println("Ticket booked successfully (middle)-----");
                 break;

             case 3:
                 upperBerths--;
                 bookedTickets.add(new Passanger(name,age,gender,"upper"));
                 tottalBerths--;
                 System.out.println("--------------------------");
                 System.out.println("Ticket booked successfully (upper)-----");
                 break;

             case 4:
                 if(tottalRACBerths > 0){
                     racTickets.add(new Passanger(name,age,gender,"side lower"));
                     tottalRACBerths--;
                     System.out.println("------------------------");
                     System.out.println("Ticket booked successfully (RAC)");

                 }else{
                     System.out.println("--- RAC tickets are also not available ");
                     System.out.println("--- If you want book ticket in waitinglist Enter 'yes' ");
                     String reply = sc.nextLine().toLowerCase();

                     if(reply.equals("yes")){
                         waitingListTickets.add(new Passanger(name,age,gender,"Waiting"));
                         tottalWaitingListTickets--;
                         System.out.println("-----------------------------");
                         System.out.println("Ticket booked successfully! (Waiting List) ");
                     }
                 }
                 break;

             default:
                 System.out.println("Invalid choice");
                 break;
         }


     }



}
