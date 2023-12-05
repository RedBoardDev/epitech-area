//
//  OptionView.swift
//  AREA
//
//  Created by jo bantzhaffen on 03/12/2023.
//

import SwiftUI

struct listTile: View {
    @State var buttonName = ""
    @State private var isToggled = false
    var body: some View {
        HStack {
            Toggle(buttonName, isOn: $isToggled).font(.subheadline)
        }
    }
}

struct OptionView: View {
    var body: some View {
        ZStack {
            VStack{
                VStack(alignment: .leading) {
                    Text("Parametres 1").font(.title)
                    Text("détails")
                        .font(.subheadline)
                    List(){
                        listTile(buttonName: "Option 1")
                        listTile(buttonName: "Option 2")
                        listTile(buttonName: "Option 3")
                        listTile(buttonName: "Option 4")
                    }
                }.padding()
                VStack{
                    VStack(alignment: .leading) {
                        Text("Parametres 2").font(.title)
                        Text("détails")
                            .font(.subheadline)
                        List(){
                            listTile(buttonName: "Option 1")
                            listTile(buttonName: "Option 2")
                            listTile(buttonName: "Option 3")
                            listTile(buttonName: "Option 4")
                        }
                    }.padding()
                }
            }
        }
    }
}

#Preview {
    OptionView()
}
