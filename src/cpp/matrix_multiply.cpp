#include <iostream>
using namespace std;

void printMatrix(int m[2][2], const char* label) {
    cout << label << ":\n";
    cout << "  +----------+\n";
    for (int i = 0; i < 2; i++) {
        cout << "  |  " << m[i][0] << "    " << m[i][1] << "  |\n";
    }
    cout << "  +----------+\n";
}

int main() {
    int A[2][2], B[2][2], C[2][2];
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            C[i][j] = 0;

    cout << "Enter Matrix A (2x2, row by row):\n";
    cout << "  a[0][0] a[0][1]: ";
    cin >> A[0][0] >> A[0][1];
    cout << "  a[1][0] a[1][1]: ";
    cin >> A[1][0] >> A[1][1];

    cout << "Enter Matrix B (2x2, row by row):\n";
    cout << "  b[0][0] b[0][1]: ";
    cin >> B[0][0] >> B[0][1];
    cout << "  b[1][0] b[1][1]: ";
    cin >> B[1][0] >> B[1][1];

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                C[i][j] += A[i][k] * B[k][j];

    cout << "\n";
    printMatrix(A, "Matrix A");
    cout << "\n";
    printMatrix(B, "Matrix B");

    cout << "\n=== Calculation: C = A x B ===\n\n";
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << "  C[" << i << "][" << j << "]";
            cout << " = A[" << i << "][0]*B[0][" << j << "]";
            cout << " + A[" << i << "][1]*B[1][" << j << "]\n";
            cout << "       = " << A[i][0] << "*" << B[0][j];
            cout << " + " << A[i][1] << "*" << B[1][j];
            cout << " = " << C[i][j] << "\n";
        }
    }

    cout << "\n";
    printMatrix(C, "Result  C = A x B");

    return 0;
}
