#include <stdio.h>
#include <stdlib.h>
int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];

    int max = 0, calories = 0;
    while(fgets(line, sizeof(line), file)) {
        if(line[0] == '\n') {
            max = max < calories ? calories : max;
            calories = 0;
        }
        else {
            calories += atoi(line);
        }
    }

    printf("%d", max);

    fclose(file);
    return 0;
}