#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cout << "How many numbers (2-20)? ";
    cin >> n;
    if (n > 20) n = 20;

    double arr[20];
    cout << "Enter " << n << " numbers: ";
    for (int i = 0; i < n; i++) cin >> arr[i];

    // Bubble sort for median
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (arr[j] > arr[j + 1]) {
                double t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;
            }

    double sum = 0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double median;
    if (n % 2 == 0)
        median = (arr[n / 2 - 1] + arr[n / 2]) / 2.0;
    else
        median = arr[n / 2];

    double variance = 0;
    for (int i = 0; i < n; i++)
        variance += (arr[i] - mean) * (arr[i] - mean);
    variance /= n;
    double stddev = sqrt(variance);

    cout << "\n=== Statistics Report ===\n\n";
    cout << "Count     :  " << n << "\n";
    cout << "Sum       :  " << sum << "\n";
    cout << "Min       :  " << arr[0] << "\n";
    cout << "Max       :  " << arr[n - 1] << "\n";
    cout << "Range     :  " << arr[n - 1] - arr[0] << "\n";
    cout << "Mean      :  " << mean << "\n";
    cout << "Median    :  " << median << "\n";
    cout << "Variance  :  " << variance << "\n";
    cout << "Std Dev   :  " << stddev << "\n";

    cout << "\nSorted data:\n  ";
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) cout << "  ";
    }
    cout << "\n";

    // Simple histogram
    cout << "\nDistribution (each * = one value):\n";
    int buckets = 5;
    double range = arr[n - 1] - arr[0];
    if (range > 0) {
        double width = range / buckets;
        for (int b = 0; b < buckets; b++) {
            double lo = arr[0] + b * width;
            double hi = lo + width;
            cout << "  [" << lo << " - " << hi << "): ";
            for (int i = 0; i < n; i++)
                if (arr[i] >= lo && (b == buckets - 1 ? arr[i] <= hi : arr[i] < hi))
                    cout << "*";
            cout << "\n";
        }
    }

    return 0;
}
