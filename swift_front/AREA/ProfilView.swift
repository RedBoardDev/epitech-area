//
//  ProfilView.swift
//  AREA
//
//  Created by jo bantzhaffen on 03/12/2023.
//

import SwiftUI

struct ProfilView: View {
    var body: some View {
        ZStack{
            Color(.purple)
            VStack {
                ZStack {
                    Circle()
                        .foregroundColor(.white)
                        .frame(width: 200)
                        .shadow(radius: /*@START_MENU_TOKEN@*/10/*@END_MENU_TOKEN@*/)
                        .padding(100)
                    Image(systemName: "person.fill")
                        .resizable()
                        .frame(width: 100, height: 100)
                        .foregroundStyle(.purple)
//                        .opacity(0.8)
                        .shadow(radius: /*@START_MENU_TOKEN@*/10/*@END_MENU_TOKEN@*/)
                }
                Spacer()
                ZStack{
                    Rectangle()
                        .ignoresSafeArea()
                        .foregroundColor(.white)
                        .shadow(radius: 100)
                        .cornerRadius(24)
                        .opacity(0.9)
                        .blur(radius: 0.100)
                        .padding(/*@START_MENU_TOKEN@*/EdgeInsets()/*@END_MENU_TOKEN@*/)
                    VStack(alignment: .center, content: {
                        Text("USERNAME").foregroundStyle(.purple)
                            .font(.title)
                            .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                            .padding(50)
                        Text("@user").foregroundStyle(.black)
                            .font(.subheadline)
                            .fontWeight(.semibold)
                            .offset(y: -50)
                        Text("SERVICE:").foregroundStyle(.purple)
                            .font(.headline)
                            .fontWeight(.bold)
                            .offset(y: -50)
                        ScrollView {
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(/*@START_MENU_TOKEN@*/0.8/*@END_MENU_TOKEN@*/)
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(/*@START_MENU_TOKEN@*/0.8/*@END_MENU_TOKEN@*/)
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(/*@START_MENU_TOKEN@*/0.8/*@END_MENU_TOKEN@*/)
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(/*@START_MENU_TOKEN@*/0.8/*@END_MENU_TOKEN@*/)
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(0.8)
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(0.8)
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(0.8)
                            Rectangle()
                                .foregroundStyle(.accent)
                                .frame(width: 300, height: 50)
                                .cornerRadius(12)
                                .opacity(0.8)
                        }.scaledToFit()
//                        Spacer()
                    })
                }
            }
        }.ignoresSafeArea()
    }
}

#Preview {
    ProfilView()
}
