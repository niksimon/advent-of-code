#include <stdio.h>
#include <stdlib.h>
int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];

    int max[256] = {0};
    int i = 0;
    while(fgets(line, sizeof(line), file)) {
        if(line[0] == '\n') {
            max[++i] = 0;
        }
        else {
            max[i] += strtol(line, NULL, 10);
        }
    }

    for(int i = 0; i < sizeof(max)/sizeof(int); i++) {
        for(int j = i + 1; j < sizeof(max)/sizeof(int); j++) {
            if(max[i] < max[j]) {
                int temp = max[i];
                max[i] = max[j];
                max[j] = temp;
            }
        }
    }

    printf("%d", max[0] + max[1] + max[2]);
    fclose(file);
    return 0;
}