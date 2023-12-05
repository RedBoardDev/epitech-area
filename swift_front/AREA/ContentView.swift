//
//  ContentView.swift
//  AREA
//
//  Created by jo bantzhaffen on 29/11/2023.
//

import SwiftUI

struct ContentView: View {
    @State var username = ""
    @State var password = ""
    @State private var selectedColor = Color.blue
    
    var body: some View {
        
        NavigationStack {
            ZStack{
                Rectangle().fill(LinearGradient(colors: [.background, .black], startPoint: .top, endPoint: .bottom)).ignoresSafeArea()
                Image("BgTop").resizable()
                    .frame(width: 800, height: 1000)
                    .offset(x: 140)
                
                ZStack{
                    VStack(alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/) {
                        Image("logopropal2Artboard_1")
                            .resizable()
                            .frame(width: 300, height: 300)
                            .scaledToFit()
                        TextField("username..", text: $username)
                            .foregroundColor(/*@START_MENU_TOKEN@*/.blue/*@END_MENU_TOKEN@*/)
                            .frame(width: 260, height: 30)
                            .padding(5)
                            .background(Color .white)
                        //.opacity(0.8)
                            .cornerRadius(12)
                        SecureField("Password..", text: $password)
                            .foregroundColor(.purple)
                            .frame(width: 260, height: 30)
                            .padding(5)
                            .background(Color .white)
                        //.opacity(0.8)
                            .cornerRadius(12)
                        NavigationLink(destination: MainPage(), label: {
                            ZStack{
                                Rectangle()
                                    .frame(width: 70, height: 50)
                                    .cornerRadius(12)
                                    .padding(10)
                                    .foregroundColor(.green)
                                Text("Login")
                                    .foregroundStyle(Color(.white))
                                    .padding(10)
                            }
                        })
                        .frame(width: 275)
                        .opacity(0.52)
                        .shadow(radius: 10)
                    }.padding(40)
                }
            }.preferredColorScheme(.dark)
        }
    }
}

#Preview {
    ContentView()
}

