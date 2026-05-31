#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Find all primes up to N (max 100): ";
    cin >> n;

    if (n > 100) n = 100;
    if (n < 2) {
        cout << "No primes exist below 2.\n";
        return 0;
    }

    bool composite[101];
    for (int i = 0; i <= n; i++) composite[i] = false;

    cout << "\n=== Sieve of Eratosthenes (N=" << n << ") ===\n\n";

    for (int p = 2; p * p <= n; p++) {
        if (!composite[p]) {
            cout << "p=" << p << " is prime  ->  strike out: ";
            bool any = false;
            for (int m = p * p; m <= n; m += p) {
                if (!composite[m]) {
                    if (any) cout << ", ";
                    cout << m;
                    composite[m] = true;
                    any = true;
                }
            }
            if (!any) cout << "(none left)";
            cout << "\n";
        }
    }

    cout << "\n----------------------------\n";
    cout << "Primes up to " << n << ":\n  ";

    int count = 0;
    for (int i = 2; i <= n; i++) {
        if (!composite[i]) {
            cout << i;
            count++;
            if (count % 10 == 0) cout << "\n  ";
            else cout << "  ";
        }
    }

    cout << "\n\nTotal: " << count << " prime(s) found.\n";

    return 0;
}
