#include <stdio.h>
#include <stdlib.h>
int main()
{
    char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];

    int score = 0;

    while(fgets(line, sizeof(line), file)) {
        char opponent = line[0];
        char player = line[2];

        score += player - 87;

        if(opponent == player - 23) {
            score += 3;
        }
        else if(opponent == 'A' && player == 'Y' || opponent == 'B' && player == 'Z' || opponent == 'C' && player == 'X') {
            score += 6;
        }
    }

    printf("%d", score);

    fclose(file);
    return 0;
}