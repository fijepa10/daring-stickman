import SwiftUI

struct ContentView: View {
    var body: some View {
        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            WebView(url: url)
                .ignoresSafeArea()
        } else {
            Text("Error: Could not find index.html in bundle.")
                .foregroundColor(.red)
        }
    }
}
