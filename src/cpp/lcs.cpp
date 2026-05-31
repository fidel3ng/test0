#include <iostream>
using namespace std;

int main() {
    char a[50], b[50];
    cout << "Enter first string: ";
    cin >> a;
    cout << "Enter second string: ";
    cin >> b;

    int m = 0, n = 0;
    for (; a[m] != 0; m++);
    for (; b[n] != 0; n++);

    int dp[51][51];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++)
            dp[i][j] = 0;

    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            if (a[i - 1] == b[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
        }

    cout << "\n=== Longest Common Subsequence ===\n\n";

    cout << "DP table:\n";
    cout << "     ";
    for (int j = 0; j < n; j++) cout << b[j] << "  ";
    cout << "\n";
    for (int i = 0; i <= m; i++) {
        if (i == 0) cout << "   ";
        else cout << a[i - 1] << "  ";
        for (int j = 0; j <= n; j++) cout << dp[i][j] << "  ";
        cout << "\n";
    }

    cout << "\nLCS length: " << dp[m][n] << "\n";

    // Traceback
    int len = dp[m][n];
    char lcs[50];
    lcs[len] = 0;
    int i = m, j = n, idx = len;
    while (i > 0 && j > 0) {
        if (a[i - 1] == b[j - 1]) {
            lcs[--idx] = a[i - 1];
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    cout << "LCS string: " << lcs << "\n";

    return 0;
}
