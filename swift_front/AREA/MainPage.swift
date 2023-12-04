//
//  MainPage.swift
//  AREA
//
//  Created by jo bantzhaffen on 30/11/2023.
//

import SwiftUI


struct MainPage: View {
    var body: some View {
        ZStack{
            VStack{
                ZStack{
                    HStack {
                        TabView(content:
                                    {
                            ProfilView()
                            .tabItem {
                                Image(systemName: "person")
                                Text("PROFILE")
                            }.tag(0)
                            HomeView()
                                .tabItem {
                                    Image(systemName: "target")
                                    Text("HOME")
                                }
                                .tag(1)
                            testView()
                                .tabItem {
                                    Image(systemName: "gearshape.fill")
                                    Text("OPTION")
                                }.tag(2)
                        }).font(.headline)
                            .accentColor(.white)
                    }
                }
            }
        }
    }
}

#Preview {
    MainPage()
}
