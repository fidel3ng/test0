#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "How many Fibonacci numbers (1-40)? ";
    cin >> n;
    if (n > 40) n = 40;

    long long fib[41];
    fib[0] = 0;
    fib[1] = 1;
    for (int i = 2; i < n; i++)
        fib[i] = fib[i - 1] + fib[i - 2];

    cout << "\n=== Fibonacci Sequence ===\n\n";

    for (int i = 0; i < n; i++) {
        cout << "F(" << i << ") = ";
        if (i >= 2)
            cout << fib[i - 1] << " + " << fib[i - 2] << " = ";
        cout << fib[i] << "\n";
    }

    return 0;
}
