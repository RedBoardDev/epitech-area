//
//  HomeView.swift
//  AREA
//
//  Created by jo bantzhaffen on 03/12/2023.
//

import SwiftUI

struct ServiceTile: View {
    @State var Title = ""
    @State var imageName = ""
    var body: some View {
        ZStack(alignment: Alignment(horizontal: .leading, vertical: .center)) {
            Rectangle()
                .frame(width: 380, height: 100)
                .foregroundColor(.white)
                .cornerRadius(12)
                .opacity(0.3)
                .blur(radius: 0.9)
                .shadow(radius: /*@START_MENU_TOKEN@*/10/*@END_MENU_TOKEN@*/)
            HStack() {
                Image(imageName)
                    .resizable()
                    .frame(width: 70, height: 70)
                    .cornerRadius(12)
                VStack{
                    Text(Title)
                        .scaledToFit()
                        .font(.title2)
                        .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        .foregroundStyle(.white)
                }
                Spacer()
                Image(systemName: "chevron.right.circle")
                    .resizable()
                    .frame(width: 40, height: 40)
                    .foregroundStyle(.white)
                    .padding()
            }.padding()
        }
    }
}

struct HomeView: View {
    var body: some View {
        ZStack(){
            Color(.green)
            VStack{
                ZStack{
                    Color(.white)
                    VStack(alignment: .center){
                        Spacer()
                        Image("logoV3")
                            .resizable()
                            .frame(width: 100, height: 100)
                            .cornerRadius(12)
                        Text("HarmonieWeb")
                            .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                            .foregroundColor(.green)
                            .bold()
                        Text("Organisez vos actions en ligne.")
                            .font(.subheadline)
                            .foregroundColor(.black)
                            .bold()
                            .multilineTextAlignment(.center)
                        Spacer()
                        Text("CHOISIR UN SERVICE")
                            .font(.title)
                            .foregroundColor(.green)
                            .bold()
                            .multilineTextAlignment(.center)
                            .offset(y: -10)
                    }
                }.shadow(radius: 10)
                ScrollView() {
                    ServiceTile(Title: "DISCORD", imageName: "githubLogo")
                    ServiceTile(Title: "SPOTIFY", imageName: "Spotify")
                    ServiceTile(Title: "GOOGLE CALENDAR", imageName: "googleCalendar")
                    ServiceTile(Title: "TRELLO", imageName: "trelloLogo")
                }
            }
        }.ignoresSafeArea()
    }
}

#Preview {
    HomeView()
}
