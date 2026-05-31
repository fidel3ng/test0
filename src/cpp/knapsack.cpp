#include <iostream>
using namespace std;

int main() {
    int W, n;
    cout << "Knapsack capacity: ";
    cin >> W;
    cout << "Number of items: ";
    cin >> n;

    int w[15], v[15];
    cout << "Enter weight and value for each item:\n";
    for (int i = 0; i < n; i++) {
        cout << "  Item " << i + 1 << " (weight value): ";
        cin >> w[i] >> v[i];
    }

    int dp[16][51];
    for (int i = 0; i <= n; i++)
        for (int j = 0; j <= W; j++)
            dp[i][j] = 0;

    cout << "\n=== 0/1 Knapsack (capacity=" << W << ") ===\n\n";

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            dp[i][j] = dp[i - 1][j];
            if (w[i - 1] <= j) {
                int take = dp[i - 1][j - w[i - 1]] + v[i - 1];
                if (take > dp[i][j]) dp[i][j] = take;
            }
        }
        cout << "Item " << i << " (w=" << w[i-1] << " v=" << v[i-1]
             << ")  best so far: " << dp[i][W] << "\n";
    }

    cout << "\nDP table (rows=items, cols=capacity 0-" << W << "):\n  cap: ";
    for (int j = 0; j <= W; j++) cout << j << " ";
    cout << "\n";
    for (int i = 0; i <= n; i++) {
        if (i == 0) cout << "  base ";
        else cout << "  itm" << i << " ";
        for (int j = 0; j <= W; j++) cout << dp[i][j] << " ";
        cout << "\n";
    }

    cout << "\nMax value: " << dp[n][W] << "\n";
    cout << "Items selected:\n";
    int j = W;
    for (int i = n; i > 0; i--) {
        if (dp[i][j] != dp[i - 1][j]) {
            cout << "  Item " << i << "  weight=" << w[i-1] << "  value=" << v[i-1] << "\n";
            j -= w[i - 1];
        }
    }

    return 0;
}
