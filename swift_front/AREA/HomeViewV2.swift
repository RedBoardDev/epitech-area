//
//  HomeViewV2.swift
//  AREA
//
//  Created by jo bantzhaffen on 04/12/2023.
//

import SwiftUI

struct Header: View {
    var body: some View {
        
        ZStack{
            Color(.white)
            VStack{
            }
        }
    }
}


struct HomeViewV2: View {
    var body: some View {
        ZStack{
            Color(.gray)
            VStack {
                Header()
            }
        }.ignoresSafeArea()
    }
}

#Preview {
    HomeViewV2()
}
