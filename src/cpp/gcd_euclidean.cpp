#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "Enter two positive integers: ";
    cin >> a >> b;

    int orig_a = a, orig_b = b;
    int step = 1;

    cout << "\n=== Euclidean Algorithm: GCD(" << a << ", " << b << ") ===\n\n";

    while (b != 0) {
        int q = a / b;
        int r = a % b;
        cout << "Step " << step++ << ":  " << a << " = "
             << q << " x " << b << " + " << r << "\n";
        a = b;
        b = r;
    }

    cout << "\nGCD(" << orig_a << ", " << orig_b << ") = " << a << "\n";

    int lcm = (orig_a / a) * orig_b;
    cout << "LCM(" << orig_a << ", " << orig_b << ") = " << lcm << "\n";

    return 0;
}
